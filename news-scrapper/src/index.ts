// src/index.ts
import express, { Request, Response } from "express";
import cron from "node-cron";
import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { TwitterApi } from "twitter-api-v2";

config(); // Charge .env

const app = express();
app.use(express.json());

// --- Config Google Gemini ---
const gemini = new GoogleGenAI({});

// --- Config Twitter ---
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  bearerToken: process.env.TWITTER_BEARER_TOKEN!,
});

const rwClient = twitterClient.readWrite;

async function useGeminiApi(content: string): Promise<string> {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-pro",
    contents: content,
  });
  return response.text || "";
}


// Fonction principale
async function fetchAndTweetNews(): Promise<void> {
  try {

    const summary = await useGeminiApi("Donne-moi l'actualité mondiale la plus importante d'aujourd'hui avec un résumé clair et précis de moins de 244 caractères.")

    if (!summary) {
      console.error("❌ Aucun résumé généré.");
      return;
    }

    console.log("📰 Résumé généré :", summary);

    await rwClient.v2.tweet(summary);
    console.log("✅ Tweet envoyé avec succès !");
  } catch (error) {
    console.error("❌ Erreur :", error);
  }
}

console.log("🚀 Démarrage de l'automatisation...");
fetchAndTweetNews();

// --- Cron job toutes les 30 min ---
cron.schedule("*/30 * * * *", () => {
  console.log("⏳ Lancement tâche planifiée...");
  fetchAndTweetNews();
});

// Route de test
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend actif. L'automatisation tourne.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
