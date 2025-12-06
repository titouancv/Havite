const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

interface PerplexityConfig {
  systemPrompt: string;
  userPrompt: string;
  jsonSchema: object;
}

interface PerplexityResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callPerplexity<T>(
  apiKey: string,
  config: PerplexityConfig
): Promise<T> {
  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        { role: "system", content: config.systemPrompt },
        { role: "user", content: config.userPrompt },
      ],
      search_recency_filter: "day",
      return_images: true,
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: config.jsonSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as PerplexityResponse;

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No response from Perplexity API");
  }

  return JSON.parse(content) as T;
}
