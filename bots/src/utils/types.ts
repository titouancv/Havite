export type NewsBotResult = { success: true; recapId: string } | { success: false; reason: string };

export type MediaName =
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

export type Category = 'news' | 'science' | 'politics' | 'culture' | 'sports' | 'economy' | 'international';

export interface Source {
	url: string;
	mediaName: MediaName;
}

export interface Article {
	title: string;
	content: string;
	imageUrl: string;
	category: Category;
	readingTime: number;
	importanceScore: number;
}

export interface ArticleResult {
	type: 'article';
	article: Article;
	sources: Source[];
}

export interface FallbackResult {
	type: 'fallback';
	reason: string;
}

export type PerplexityResult = ArticleResult | FallbackResult;

export interface TweetResult {
	tweet: string;
}

export const PERPLEXITY_JSON_SCHEMA = {
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
					url: { type: 'string', description: 'Direct link to the article' },
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
