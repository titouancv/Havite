import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = (supabaseUrl: string, supabaseAnonKey: string) => {
	return createClient(supabaseUrl, supabaseAnonKey);
};

/* ----------------------------- DB Interfaces ----------------------------- */

export interface DBMedia {
	id: string;
	name: string;
	label: string;
	url: string;
	logo_url: string;
}

export interface DBSource {
	id: string;
	url: string;
	media: DBMedia;
}

export interface DBArticle {
	id: string;
	title: string;
	summary: string;
	content: string;
	image_url: string;
	category: string;
	reading_time: number;
	created_at: number;
}

/* ----------------------- Recap With Vote Counts ----------------------- */

export interface DBRecap {
	id: string;
	up_votes: number;
	down_votes: number;
	article: DBArticle;
	sources: DBSource[];
}

/* -------------------------- User Vote Record --------------------------- */

export interface DBRecapVote {
	id: string;
	recap_id: string;
	user_id: string;
	vote: 1 | -1;
	created_at: string;
}
