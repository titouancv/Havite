import { generateObject } from "ai";
import { z } from "zod";
import { createPerplexity } from "@ai-sdk/perplexity";

const perplexity = createPerplexity({
  apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY ?? "",
});

const SourceSchema = z.object({
  url: z.string(),
  mediaName: z.enum([
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
  ]),
});

const ArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
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
  readingTime: z.number(),
  importanceScore: z.number().min(1).max(10), // ajout du score
});

const ArticleWithSourcesSchema = z.object({
  article: ArticleSchema,
  sources: z.array(SourceSchema),
});

const FallbackSchema = z.object({
  type: z.literal("fallback"),
  reason: z.string(),
});

const ResultSchema = z.union([ArticleWithSourcesSchema, FallbackSchema]);

type Result = z.infer<typeof ResultSchema>;

const systemPrompt = `
Tu es un moteur de veille journalistique temps réel.

Objectif :
- Identifier UNE information récente et pertinente
- Publiée dans les 30 dernières minutes
- Retourner le titre, le résumé, la catégorie, l'image et le score d'importance (1 à 10)
- Provenant des médias suivants :

Le Monde,
Le Figaro,
Le Parisien,
20 Minutes,
BFM TV,
Libération,
Ouest-France,
Le Point,
Le nouvel Obs,
Mediapart.

Conseils :
- Préférer une information différente du dernier titre si possible
- Même si elle n'est pas majeure, retourne quelque chose
- Ne jamais inventer d'informations

Format de sortie :
- Si une information pertinente est trouvée, retourne un objet JSON avec les champs suivants :
{
    article:
        {
        "readingTime": "temps de lecture estimé en minutes",
        "title": "Titre de l'article",
        "content": "Un article détaillé sur l'information d'une bonne quinzaine de phrases",
        "category": "Catégorie de l'article (news, science, politics, culture, sports, economy, international)",
        "imageUrl": "URL de l'image associée à l'article",
        "importanceScore": 1-10
        },
    sources: [
            {
            "url": "URL de la source",
            "mediaName": "Nom du média (lemonde, lefigaro, leparisien, vingtminutes, bfmtv, liberation, ouestfrance, lepoint, lenouvelobs, mediapart)"
            }
        ]
}

- Si aucune information ne respecte les critères, retourne un objet fallback avec une raison :
{
  "type": "fallback",
  "reason": "Raison pour laquelle aucune info n'a été trouvée"
}

`;

export const perplexityResult = async (lastTitle?: string): Promise<Result> => {
  const userPrompt = `
Dernière information déjà envoyée :
"${lastTitle ?? "AUCUNE"}"

Mission :
- Trouver une information récente (moins de 30 minutes)
- Provenant des médias autorisés
- Fournir un score d'importance de 1 à 10 (10 = info très importante)
- Préférer une info différente du dernier titre si possible

Si aucune info valide → retourner le fallback.
`;

  const result = await generateObject({
    model: perplexity("sonar"),
    schema: ResultSchema,
    system: systemPrompt,
    prompt: userPrompt,
  });

  // Sécurité : fallback si objet vide ou invalide
  if (!result?.object) {
    return {
      type: "fallback",
      reason: "Aucune information majeure valide trouvée",
    };
  }

  return result.object;
};
