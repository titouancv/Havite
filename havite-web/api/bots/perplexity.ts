import { generateObject } from "ai";
import { z } from "zod";
import { createPerplexity } from "@ai-sdk/perplexity";

const perplexity = createPerplexity({
  apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY ?? "",
});

const SourceSchema = z.object({
  url: z
    .string()
    .url()
    .describe(
      "Direct link to the article. MUST belong to the domain of the selected mediaName (e.g., if mediaName is 'lemonde', the URL domain must be from 'lemonde.fr')"
    ),
  mediaName: z
    .enum([
      "lemonde",
      "lefigaro",
      "leparisien",
      "vingtminutes",
      "bfmtv",
      "liberation",
      "ouestfrance",
      "lepoint",
      "lenouvelobs",
      "mediapart",
    ])
    .describe("The strict ID of the media outlet"),
});

const ArticleSchema = z.object({
  title: z.string().describe("The headline in French"),
  content: z.string().describe("A detailed summary of ~15 sentences in French"),
  imageUrl: z.string().url().describe("URL of the main article image"),
  category: z
    .enum([
      "news",
      "science",
      "politics",
      "culture",
      "sports",
      "economy",
      "international",
    ])
    .default("news"),
  readingTime: z
    .number()
    .int()
    .describe("Estimated reading time in minutes (integer only)"),
  importanceScore: z
    .number()
    .min(1)
    .max(10)
    .describe("1-10 score (10 = breaking/major news)"),
});

const ArticleWithSourcesSchema = z.object({
  article: ArticleSchema,
  sources: z.array(SourceSchema),
});

const FallbackSchema = z.object({
  type: z.literal("fallback"),
  reason: z.string(),
});

// Export this for use in the function
export const ResultSchema = z.union([ArticleWithSourcesSchema, FallbackSchema]);
export type Result = z.infer<typeof ResultSchema>;

export const perplexityResult = async (
  lastSummary?: string
): Promise<Result> => {
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
    - If a valid article <1day is found: Return the 'article' object with the 'sources' array.
    - If NO article <1day is found: Return the 'fallback' object.
  `;

  // Section modifiée du User Prompt
  const userPrompt = `
    ### CONTEXT
    Last Reported News: "${lastSummary ?? "NONE"}"

    ### MISSION
    1. Search the authorized French media for the latest articles.
    2. Filter for items published in the last day.
    3. Select the most important news item. **CRITICAL: This item MUST be on a completely distinct and separate topic from the "Last Reported News".**
    4. Generate the JSON response.
`;

  const result = await generateObject({
    model: perplexity("sonar"),
    schema: ResultSchema,
    system: systemPrompt,
    prompt: userPrompt,
    providerOptions: {
      perplexity: {
        return_images: true,
      },
    },
  });

  if (!result?.object) {
    return { type: "fallback", reason: "Structure generation failed" };
  }

  const { article, sources } = result.object as {
    article: {
      title: string;
      content: string;
      imageUrl: string;
      importanceScore: number;
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

  console.log(result.providerMetadata);
  if (result.providerMetadata?.perplexity?.images) {
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

  return { article, sources };
};
