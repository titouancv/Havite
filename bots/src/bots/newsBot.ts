import { createSupabaseClient } from '../api/supabase';
import { callPerplexity } from '../api/perplexity';
import { callMistral } from '../api/mistral';
import { runTwitterBot } from '../api/twitter';
import { SupabaseClient } from '@supabase/supabase-js';
import { PERPLEXITY_SYSTEM_PROMPT, buildPerplexityUserPrompt, MISTRAL_SYSTEM_PROMPT, buildMistralUserPrompt } from '../utils/prompts';
import { PerplexityResult, PERPLEXITY_JSON_SCHEMA, TweetResult, Article, Source, NewsBotResult } from '../utils/types';
export interface Env {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
	PERPLEXITY_API_KEY: string;
	MISTRAL_API_KEY: string;
	TWITTER_API_KEY: string;
	TWITTER_API_SECRET: string;
	TWITTER_ACCESS_TOKEN: string;
	TWITTER_ACCESS_SECRET: string;
}

export async function runNewsBot(env: Env): Promise<NewsBotResult> {
	console.log('Running News Bot...');
	const supabase = createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

	const lastSummary = await getLastRecapSummary(supabase);
	console.log('Last recap summary:', lastSummary);

	const result = await createNewRecap(supabase, env, lastSummary);
	console.log('Result:', result);

	return result;
}

export async function getLastRecapSummary(supabase: SupabaseClient): Promise<string | undefined> {
	const { data, error } = await supabase.from('article').select('summary').order('created_at', { ascending: false }).limit(1).single();

	if (error || !data) {
		return undefined;
	}

	return data.summary;
}

export async function createNewRecap(supabase: SupabaseClient, env: Env, lastSummary?: string): Promise<NewsBotResult> {
	const perplexityData = await fetchArticleFromPerplexity(env.PERPLEXITY_API_KEY, lastSummary);

	if (perplexityData.type === 'fallback') {
		return { success: false, reason: perplexityData.reason };
	}

	const { article, sources } = perplexityData;

	const summary = await generateTweetSummary(article.content, env.MISTRAL_API_KEY);

	try {
		const articleId = await insertArticle(supabase, article, summary);
		const recapId = await insertRecap(supabase, articleId);

		if (shouldPostToTwitter()) {
			console.log('Posting summary to Twitter...');
			await runTwitterBot(summary, recapId, env);
		}

		await insertSources(supabase, sources, recapId);

		console.log('New recap created with ID:', recapId);
		return { success: true, recapId };
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return { success: false, reason: message };
	}
}

async function fetchArticleFromPerplexity(apiKey: string, lastSummary?: string) {
	console.log('Fetching article from Perplexity...');
	const result = await callPerplexity<PerplexityResult>(apiKey, {
		systemPrompt: PERPLEXITY_SYSTEM_PROMPT,
		userPrompt: buildPerplexityUserPrompt(lastSummary),
		jsonSchema: PERPLEXITY_JSON_SCHEMA,
	});
	console.log('Perplexity data received:', result);
	return result;
}

async function generateTweetSummary(content: string, apiKey: string) {
	console.log('Generating tweet summary from Mistral...');
	const result = await callMistral<TweetResult>(apiKey, {
		systemPrompt: MISTRAL_SYSTEM_PROMPT,
		userPrompt: buildMistralUserPrompt(content),
	});
	console.log('Mistral summary received:', result.tweet);
	return result.tweet;
}

async function insertArticle(supabase: SupabaseClient, article: Article, summary: string) {
	const { data, error } = await supabase
		.from('article')
		.insert({
			title: article.title,
			summary: summary,
			content: article.content,
			image_url: article.imageUrl,
			category: article.category,
			reading_time: article.readingTime,
		})
		.select('id')
		.single();

	if (error || !data) {
		console.error('Error inserting article:', error);
		throw new Error(error?.message ?? 'Failed to insert article');
	}

	return data.id;
}

async function insertRecap(supabase: SupabaseClient, articleId: string) {
	const { data, error } = await supabase
		.from('recap')
		.insert({
			article_id: articleId,
			up_votes: 0,
			down_votes: 0,
		})
		.select('id')
		.single();

	if (error || !data) {
		console.error('Error inserting recap:', error);
		throw new Error(error?.message ?? 'Failed to insert recap');
	}

	return data.id;
}

async function insertSources(supabase: SupabaseClient, sources: Source[], recapId: string) {
	for (const source of sources) {
		const { data: media, error: mediaError } = await supabase.from('media').select('id').eq('name', source.mediaName).single();

		if (mediaError || !media) {
			console.error(`Media "${source.mediaName}" not found:`, mediaError);
			continue;
		}

		const { error: sourceError } = await supabase.from('sources').insert({
			url: source.url,
			media_id: media.id,
			recap_id: recapId,
		});

		if (sourceError) {
			console.error('Error inserting source:', sourceError);
		}
	}
}

function shouldPostToTwitter(): boolean {
	const now = new Date();
	const franceHour = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' })).getHours();

	if (franceHour < 8 || franceHour >= 22) {
		console.log(`Twitter post skipped (current hour in France: ${franceHour}h)`);
		return false;
	}
	return true;
}
