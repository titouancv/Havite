interface TwitterEnv {
	TWITTER_API_KEY: string;
	TWITTER_API_SECRET: string;
	TWITTER_ACCESS_TOKEN: string;
	TWITTER_ACCESS_SECRET: string;
}

function generateOAuthSignature(
	method: string,
	url: string,
	params: Record<string, string>,
	consumerSecret: string,
	tokenSecret: string,
): Promise<string> {
	const sortedParams = Object.keys(params)
		.sort()
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&');

	const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
	const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

	return hmacSha1(signingKey, signatureBase);
}

async function hmacSha1(key: string, message: string): Promise<string> {
	const encoder = new TextEncoder();
	const keyData = encoder.encode(key);
	const messageData = encoder.encode(message);

	const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);

	const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

function generateNonce(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function runTwitterBot(content: string, recapId: string, env: TwitterEnv): Promise<void> {
	try {
		const tweet = content + `\n\nPour lire le récapitulatif complet :\nhttps://havite.news/${recapId}`;
		const url = 'https://api.twitter.com/2/tweets';
		const method = 'POST';

		const oauthParams: Record<string, string> = {
			oauth_consumer_key: env.TWITTER_API_KEY,
			oauth_nonce: generateNonce(),
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
			oauth_token: env.TWITTER_ACCESS_TOKEN,
			oauth_version: '1.0',
		};

		const signature = await generateOAuthSignature(method, url, oauthParams, env.TWITTER_API_SECRET, env.TWITTER_ACCESS_SECRET);

		oauthParams.oauth_signature = signature;

		const authHeader =
			'OAuth ' +
			Object.keys(oauthParams)
				.sort()
				.map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
				.join(', ');

		const response = await fetch(url, {
			method,
			headers: {
				Authorization: authHeader,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: tweet }),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Twitter API error: ${response.status} - ${error}`);
		}

		console.log('✅ Tweet posted successfully');
	} catch (error) {
		console.error('❌ Error posting tweet:', error);
		throw error;
	}
}
