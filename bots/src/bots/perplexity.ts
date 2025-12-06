const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

type MediaName =
	| 'lemonde'
	| 'lefigaro'
	| 'leparisien'
	| 'vingtminutes'
	| 'bfmtv'
	| 'liberation'
	| 'ouestfrance'
	| 'lepoint'
	| 'lenouvelobs'
	| 'mediapart';

type Category = 'news' | 'science' | 'politics' | 'culture' | 'sports' | 'economy' | 'international';

interface Source {
	url: string;
	mediaName: MediaName;
}

interface Article {
	title: string;
	content: string;
	imageUrl: string;
	category: Category;
	readingTime: number;
	importanceScore: number;
}

interface ArticleResult {
	type: 'article';
	article: Article;
	sources: Source[];
}

interface FallbackResult {
	type: 'fallback';
	reason: string;
}

export type Result = ArticleResult | FallbackResult;

const ResultJsonSchema = {
	type: 'object',
	properties: {
		type: {
			type: 'string',
			enum: ['article', 'fallback'],
			description: "Type of result: 'article' if found, 'fallback' if not",
		},
		reason: {
			type: 'string',
			description: 'Reason for fallback (only if type is fallback)',
		},
		article: {
			type: 'object',
			properties: {
				title: { type: 'string', description: 'The headline in French' },
				content: {
					type: 'string',
					description: 'A detailed summary of ~15 sentences in French',
				},
				imageUrl: {
					type: 'string',
					description: 'URL of the main article image',
				},
				category: {
					type: 'string',
					enum: ['news', 'science', 'politics', 'culture', 'sports', 'economy', 'international'],
				},
				readingTime: {
					type: 'integer',
					description: 'Estimated reading time in minutes',
				},
				importanceScore: {
					type: 'number',
					description: '1-10 score (10 = breaking/major news)',
				},
			},
			required: ['title', 'content', 'imageUrl', 'category', 'readingTime', 'importanceScore'],
		},
		sources: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					url: {
						type: 'string',
						description: 'Direct link to the article',
					},
					mediaName: {
						type: 'string',
						enum: [
							'lemonde',
							'lefigaro',
							'leparisien',
							'vingtminutes',
							'bfmtv',
							'liberation',
							'ouestfrance',
							'lepoint',
							'lenouvelobs',
							'mediapart',
						],
						description: 'The strict ID of the media outlet',
					},
				},
				required: ['url', 'mediaName'],
			},
		},
	},
	required: ['type'],
};

interface PerplexityResponse {
	id: string;
	model: string;
	choices: {
		index: number;
		message: {
			role: string;
			content: string;
		};
		finish_reason: string;
	}[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}

export const perplexityResult = async (apiKey: string, lastSummary?: string): Promise<Result> => {
	const systemPrompt = `
    You are an expert real-time journalistic monitoring engine specialized in French media.

    ### AUTHORIZED SOURCES ONLY
    Strictly limit your search to articles from the following outlets. The returned URL MUST match the domain of the source.

    Mapping & Domain Constraint:
    - Le Monde (lemonde) -> Domain MUST be *lemonde.fr*
    - Le Figaro (lefigaro) -> Domain MUST be *lefigaro.fr*
    - Le Parisien (leparisien) -> Domain MUST be *leparisien.fr*
    - 20 Minutes (vingtminutes) -> Domain MUST be *20minutes.fr*
    - BFM TV (bfmtv) -> Domain MUST be *bfmtv.com*
    - Libération (liberation) -> Domain MUST be *liberation.fr*
    - Ouest-France (ouestfrance) -> Domain MUST be *ouest-france.fr*
    - Le Point (lepoint) -> Domain MUST be *lepoint.fr*
    - Le Nouvel Obs (lenouvelobs) -> Domain MUST be *nouvelobs.com*
    - Mediapart (mediapart) -> Domain MUST be *mediapart.fr*

    ### OBJECTIVE
    Identify the single most significant news event published within the **last day**.

    ### CRITERIA & CONSTRAINTS
    1. **Freshness:** The article MUST have been published less than one day ago.
    2. **Uniqueness/Exclusion (CRITICAL):** The resulting article MUST cover a fundamentally different topic, scope, or event than the one provided in the "Last Reported News". If the only fresh news found is related to the previous title, you **MUST** return the fallback object. Do not risk topic repetition.
    3. **Accuracy:** Do not hallucinate. If no news meets the <1day criteria or the Uniqueness criteria, return the Fallback object.
    4. **Content:** The summary must be detailed (approx 15 sentences), factual, and journalistic in tone.

    ### OUTPUT LOGIC
    - If a valid article <1day is found: Return a JSON with type "article", the article object and sources array.
    - If NO article <1day is found: Return a JSON with type "fallback" and a reason string.
  `;

	const userPrompt = `
    ### CONTEXT
    Last Reported News: "${lastSummary ?? 'NONE'}"

    ### MISSION
    1. Search the authorized French media for the latest articles.
    2. Filter for items published in the last day.
    3. Select the most important news item. **CRITICAL: This item MUST be on a completely distinct and separate topic from the "Last Reported News".**
    4. Generate the JSON response following the specified schema.
  `;

	const response = await fetch(PERPLEXITY_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'sonar',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			search_recency_filter: 'day',
			return_images: true,
			response_format: {
				type: 'json_schema',
				json_schema: {
					schema: ResultJsonSchema,
				},
			},
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
	}

	const data = (await response.json()) as PerplexityResponse;

	const content = data.choices?.[0]?.message?.content;
	if (!content) {
		return { type: 'fallback', reason: 'No response from Perplexity API' };
	}

	const parsed = JSON.parse(content) as Result;

	if (parsed.type === 'fallback') {
		return parsed;
	}

	return parsed;
};
