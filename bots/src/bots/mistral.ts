import { Mistral } from '@mistralai/mistralai';

const createMistralClient = (apiKey: string) => {
	return new Mistral({ apiKey });
};

type Tweet = {
	tweet: string;
};

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
Tu ne dois jamais inventer d'informations.
Tu dois retourner UNIQUEMENT un objet JSON avec une clé "tweet" contenant le tweet.
`;

export const mistralResult = async (article: string, apiKey: string): Promise<Tweet> => {
	const mistral = createMistralClient(apiKey);

	const userPrompt = `
Voici un article. Transforme-le en un seul tweet clair, impactant et fidèle au contenu :

ARTICLE :
"""
${article}
"""

Retourne ta réponse en JSON avec le format: { "tweet": "ton tweet ici" }
`;

	const response = await mistral.chat.complete({
		model: 'mistral-large-latest',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: userPrompt },
		],
		responseFormat: { type: 'json_object' },
	});

	const content = response.choices?.[0]?.message?.content;
	if (!content || typeof content !== 'string') {
		throw new Error('No response from Mistral API');
	}

	const parsed = JSON.parse(content) as Tweet;
	return parsed;
};
