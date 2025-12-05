import { generateObject } from "ai";
import { z } from "zod";
import { createMistral } from "@ai-sdk/mistral";

const mistral = createMistral({
  apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY ?? "",
});

const TweetSchema = z.object({
  tweet: z.string(),
});

type Tweet = z.infer<typeof TweetSchema>;

const systemPrompt = `
Tu es un expert en communication digitale, journalisme et réseaux sociaux.
Tu transformes des articles en tweets engageants.
Tu dois :
- Résumer l'information essentielle
- Garder le sens exact de l'article
- Respecter le format Twitter (280 caractères max)
- Utiliser un ton percutant
- N'utilise pas de hashtags ni de mentions
- Ajoute un mini titre accrocheur au début du tweet avec un emoji, suivi d'un saut de ligne
Tu ne dois jamais inventer d’informations.
`;

export const mistralResult = async (article: string): Promise<Tweet> => {
  const userPrompt = `
Voici un article. Transforme-le en un seul tweet clair, impactant et fidèle au contenu :

ARTICLE :
"""
${article}
"""
`;

  const result = await generateObject({
    model: mistral("mistral-large-latest"),
    schema: TweetSchema,
    system: systemPrompt,
    prompt: userPrompt,
  });
  return result.object;
};
