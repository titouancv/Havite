// src/index.ts
import express, { Request, Response } from 'express'
import cron from 'node-cron'
import { config } from 'dotenv'
import { TwitterApi } from 'twitter-api-v2'

config() // Charge .env

const app = express()
app.use(express.json())

// --- Config Twitter ---
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
})

async function sendRequestToSonarApi(content: string): Promise<string> {
  // Set up the API endpoint and headers
  const url = 'https://api.perplexity.ai/chat/completions'
  const headers = {
    Authorization: 'Bearer ' + process.env.SONAR_API_KEY,
    'Content-Type': 'application/json',
  }

  // Define the request payload
  const payload = {
    model: 'sonar',
    messages: [{ role: 'user', content: content }],
  }

  // Make the API call
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  return data.choices[0].message.content
}

// Fonction principale
async function fetchAndTweetNews(): Promise<void> {
  try {
    const summary = await sendRequestToSonarApi(
      "Tu es un assistant d'actualités. Fournis-moi un résumé clair et précis de l'actualité la plus importante de la dernière heures, en moins de 244 caractères. Présente les faits de manière objective, sans jugement ni interprétation"
    )

    if (!summary) {
      console.error('❌ Aucun résumé généré.')
      return
    }

    console.log('📰 Résumé généré :', summary)
    await twitterClient.v2.tweet(summary)
  } catch (error) {
    console.error('❌ Erreur :', error)
  }
}

// --- Cron job toutes les 2h ---
cron.schedule('0 */2 * * *', () => {
  console.log('⏳ Lancement tâche planifiée...')
  fetchAndTweetNews()
})

// Route de test
app.get('/', (_req: Request, res: Response) => {
  res.send("Backend actif. L'automatisation tourne.")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`))
