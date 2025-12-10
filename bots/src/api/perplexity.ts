import { generateObject } from 'ai';
import { z } from 'zod';
import { createPerplexity } from '@ai-sdk/perplexity';
import { PerplexityResult } from '../utils/types';
import { PERPLEXITY_SYSTEM_PROMPT, buildPerplexityUserPrompt } from '../utils/prompts';

// Cloudflare Worker version: no process.env, needs env.PERPLEXITY_API_KEY
export interface Env {
	PERPLEXITY_API_KEY: string;
}

// ---------- SCHEMAS ----------
const SourceSchema = z.object({
	url: z.string().url().describe('The direct URL to the source article, should match the domain of the mediaName'),
	mediaName: z
		.enum([
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
		])
		.describe('The name of the media outlet'),
});

const ArticleSchema = z.object({
	title: z.string().describe('The title of the article'),
	content: z.string().describe('A detailed summary of the article (approx 15 sentences)'),
	imageUrl: z.string().url().describe('The URL of the main image for the article'),
	category: z
		.enum(['news', 'science', 'politics', 'culture', 'sports', 'economy', 'international'])
		.describe('The category of the news item'),
	readingTime: z.number().int().describe('Estimated reading time in minutes'),
	importanceScore: z.number().min(1).max(10).describe('A score from 1 to 10 indicating the importance of the news'),
});

const ArticleWithSourcesSchema = z.object({
	article: ArticleSchema.describe('The main article content'),
	sources: z.array(SourceSchema).describe('List of sources used for this article'),
});

const FallbackSchema = z.object({
	type: z.literal('fallback').describe('Type identifier for fallback result'),
	reason: z.string().describe('Reason why no article was found'),
});

export const ResultSchema = z.union([ArticleWithSourcesSchema, FallbackSchema]);
export type Result = z.infer<typeof ResultSchema>;

// ---------- MAIN FUNCTION (WORKER SAFE) ----------
export async function perplexityResult(env: Env, lastRecaps: { title: string; category: string }[]): Promise<PerplexityResult> {
	const perplexity = createPerplexity({
		apiKey: env.PERPLEXITY_API_KEY,
	});

	const result = await generateObject({
		model: perplexity('sonar'),
		schema: ResultSchema,
		system: PERPLEXITY_SYSTEM_PROMPT,
		prompt: buildPerplexityUserPrompt(lastRecaps),
		providerOptions: {
			perplexity: {
				return_images: true,
			},
		},
	});

	if (!result?.object) {
		return { type: 'fallback', reason: 'Structure generation failed' };
	}

	if ('type' in result.object && result.object.type === 'fallback') {
		return result.object;
	}

	const { article, sources } = result.object as any;

	// Cloudflare supports console.log
	console.log('Perplexity metadata', result.providerMetadata);

	if (article && result.providerMetadata?.perplexity?.images) {
    const metadata = result.providerMetadata as {
      perplexity: {
        usage: { citationTokens: number; numSearchQueries: number };
        images: {
          imageUrl: string;
          originUrl: string;
          height: number;
          width: number;
        }[];
      };
    };
    article.imageUrl = metadata.perplexity.images[0].imageUrl;
	}

	return { type: 'article', article, sources };
}
