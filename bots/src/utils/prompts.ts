export const PERPLEXITY_SYSTEM_PROMPT = `
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
Identify the single most significant news event published within the **last day** across ALL categories.

### SEARCH STRATEGY (CRITICAL)
You MUST actively search across ALL these categories - do NOT focus only on politics/international:
- **news**: General news, faits divers, society
- **science**: Technology, health, environment, scientific discoveries
- **politics**: French politics, government, elections
- **culture**: Entertainment, cinema, music, arts, celebrities
- **sports**: Football, rugby, tennis, Olympics, all sports events
- **economy**: Business, finance, markets, companies
- **international**: World news, foreign affairs

### CRITERIA & CONSTRAINTS
1. **Freshness:** The article MUST have been published less than one day ago.
2. **Diversity:** Search ALL categories before selecting. Do not default to politics/international.
3. **Uniqueness:** The article MUST cover a different topic than previously reported news.
4. **Accuracy:** Do not hallucinate. Only return real articles from authorized sources.
5. **Content:** The summary must be detailed (approx 15 sentences), factual, and journalistic in tone.

### OUTPUT LOGIC
- If a valid article <1day is found: Return a JSON with type "article", the article object and sources array.
- If NO article <1day is found: Return a JSON with type "fallback" and a reason string.
`;

export const MISTRAL_SYSTEM_PROMPT = `
Tu es un expert en communication digitale, journalisme et réseaux sociaux.
Tu transformes des articles en tweets engageants.
Tu dois :
- Résumer l'information essentielle
- Garder le sens exact de l'article
- Respecter le format Twitter (280 caractères max, espaces inclus)
- Utiliser un ton percutant
- N'utilise pas de hashtags ni de mentions
- Ajoute un mini titre accrocheur au début du tweet avec un emoji, suivi d'un saut de ligne
Tu ne dois jamais inventer d'informations.
Tu dois retourner UNIQUEMENT un objet JSON avec une clé "tweet" contenant le tweet.
`;

export function buildPerplexityUserPrompt(lastRecaps: { title: string; category: string }[]): string {
	const allCategories = ['news', 'science', 'politics', 'culture', 'sports', 'economy', 'international'] as const;
	let context = '';
	let categoryHint = '';

	if (lastRecaps.length > 0) {
		const recentTopics = lastRecaps.map((r, i) => `${i + 1}. "${r.title}" (${r.category})`).join('\n');
		context = `### RECENTLY COVERED TOPICS (DO NOT REPEAT THESE)\n${recentTopics}\n`;

		const recentCategories = [...new Set(lastRecaps.map((r) => r.category))];
		const preferredCategories = allCategories.filter((c) => !recentCategories.includes(c));

		if (preferredCategories.length > 0) {
			categoryHint = `\n### CATEGORY GUIDANCE\nRecent coverage focused on: ${recentCategories.join(', ')}.\n**ACTIVELY SEARCH** for news in these under-covered categories: **${preferredCategories.join(', ')}**.\nLook for: sports events, scientific discoveries, cultural news, economic developments, etc.\n`;
		} else {
			categoryHint = `\n### CATEGORY GUIDANCE\nAll categories recently covered. Find the most newsworthy story on a different topic.\n`;
		}
	} else {
		categoryHint = `\n### CATEGORY GUIDANCE\nNo previous coverage. Search ALL categories (${allCategories.join(', ')}) and select the most important story.\n`;
	}

	return `${context}${categoryHint}
### MISSION
1. **Search broadly** across ALL authorized French media for articles from the last day.
2. **Explore ALL categories**: news, science, politics, culture, sports, economy, international.
3. Select the most important AND different news item from previously covered topics.
4. Generate the JSON response.

**Remember**: There are always interesting stories in sports, science, culture, and economy. Don't only look at politics and international!
`;
}

export function buildMistralUserPrompt(article: string): string {
	return `
Voici un article. Transforme-le en un seul tweet clair, impactant et fidèle au contenu :

ARTICLE :
"""
${article}
"""

Retourne ta réponse en JSON avec le format: { "tweet": "ton tweet ici" }
`;
}
