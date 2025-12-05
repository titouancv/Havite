import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export async function runTwitterBot(
  content: string,
  recapId: string
): Promise<void> {
  try {
    const tweet =
      content +
      `\n\nPour lire le récapitulatif complet :\n https://havite.news/${recapId}`;
    await twitterClient.v2.tweet(tweet);
    console.log("✅ Tweet posted successfully");
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
    throw error;
  }
}
