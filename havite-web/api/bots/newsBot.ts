import { supabase } from "@/lib/supabase";
import { perplexityResult } from "./perplexity";
import { mistralResult } from "./mistral";

type NewsBotResult =
  | { success: true; recapId: string }
  | { success: false; reason: string };

export async function createNewRecap(
  lastTitle?: string
): Promise<NewsBotResult> {
  // 1. Récupérer l'article via Perplexity
  console.log("Fetching article from Perplexity...");
  const perplexityData = await perplexityResult(lastTitle);
  console.log("Perplexity data received:", perplexityData);

  // Vérifier si c'est un fallback
  if ("type" in perplexityData && perplexityData.type === "fallback") {
    return { success: false, reason: perplexityData.reason };
  }

  // TypeScript sait maintenant que c'est ArticleWithSources
  const { article, sources } = perplexityData as {
    article: {
      title: string;
      content: string;
      imageUrl: string;
      category:
        | "news"
        | "science"
        | "politics"
        | "culture"
        | "sports"
        | "economy"
        | "international";
      readingTime: number;
    };
    sources: {
      url: string;
      mediaName:
        | "lemonde"
        | "lefigaro"
        | "leparisien"
        | "vingtminutes"
        | "bfmtv"
        | "liberation"
        | "ouestfrance"
        | "lepoint"
        | "lenouvelobs"
        | "mediapart";
    }[];
  };

  console.log("Fetching article from Mistral...");
  // 2. Générer un résumé/tweet via Mistral
  const tweetData = await mistralResult(article.content);
  const summary = tweetData.tweet;
  console.log("Mistral summary received:", summary);

  // 3. Insérer l'article dans la base de données
  const { data: articleData, error: articleError } = await supabase
    .from("article")
    .insert({
      title: article.title,
      summary: summary,
      content: article.content,
      image_url: article.imageUrl,
      category: article.category,
      reading_time: article.readingTime,
    })
    .select("id")
    .single();

  if (articleError || !articleData) {
    console.error("Error inserting article:", articleError);
    return { success: false, reason: articleError?.message ?? "Unknown error" };
  }

  const articleId = articleData.id;

  // 4. Insérer le recap
  const { data: recapData, error: recapError } = await supabase
    .from("recap")
    .insert({
      article_id: articleId,
      up_votes: 0,
      down_votes: 0,
    })
    .select("id")
    .single();

  if (recapError || !recapData) {
    console.error("Error inserting recap:", recapError);
    return { success: false, reason: recapError?.message ?? "Unknown error" };
  }

  const recapId = recapData.id;

  // 5. Insérer les sources
  for (const source of sources) {
    // Récupérer l'id du média par son nom
    const { data: media, error: mediaError } = await supabase
      .from("media")
      .select("id")
      .eq("label", source.mediaName)
      .single();

    if (mediaError || !media) {
      console.error(
        `Media "${source.mediaName}" not found in database:`,
        mediaError
      );
      continue;
    }

    // Insérer la source
    const { error: sourceError } = await supabase.from("sources").insert({
      url: source.url,
      media_id: media.id,
      recap_id: recapId,
    });

    if (sourceError) {
      console.error("Error inserting source:", sourceError);
    }
  }
  console.log("New recap created with ID:", recapId);
  return { success: true, recapId };
}

// Fonction pour récupérer le dernier titre (pour éviter les doublons)
export async function getLastRecapTitle(): Promise<string | undefined> {
  const { data, error } = await supabase
    .from("article")
    .select("title")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return undefined;
  }

  return data.title;
}

// Fonction principale pour le bot
export async function runNewsBot(): Promise<NewsBotResult> {
  console.log("Running News Bot...");
  const lastTitle = await getLastRecapTitle();
  console.log("Last recap title:", lastTitle);
  const newArticle = await createNewRecap(lastTitle);
  console.log("New article created:", newArticle);
  return newArticle;
}
