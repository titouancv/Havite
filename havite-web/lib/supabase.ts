import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ----------------------------- DB Interfaces ----------------------------- */

export interface DBMedia {
  id: string;
  name: string;
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
/* (Si tu veux plus tard afficher "l'utilisateur a déjà voté ?") */

export interface DBRecapVote {
  id: string;
  recap_id: string;
  user_id: string;
  vote: 1 | -1;
  created_at: string;
}
