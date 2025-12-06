import { Mistral } from "@mistralai/mistralai";

interface MistralConfig {
  systemPrompt: string;
  userPrompt: string;
}

export async function callMistral<T>(
  apiKey: string,
  config: MistralConfig
): Promise<T> {
  const client = new Mistral({ apiKey });

  const response = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: "system", content: config.systemPrompt },
      { role: "user", content: config.userPrompt },
    ],
    responseFormat: { type: "json_object" },
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("No response from Mistral API");
  }

  return JSON.parse(content) as T;
}
