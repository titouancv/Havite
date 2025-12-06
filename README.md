# Havite

Havite is an AI-powered tech news aggregation and summarization platform.

## Project Structure

The project is organized as a monorepo with the following folders:

- **`havite-web/`**: Full-stack web application (Next.js 16, React 19, Tailwind CSS, Supabase).
- **`bots/`**: News scraping and content generation bot (Cloudflare Workers, Mistral AI, Supabase).

## Prerequisites

- Node.js (v20+ recommended)
- npm (v10+)
- Supabase account (for database and authentication)
- Cloudflare account (for Workers deployment)

## Installation

Install dependencies for each package:

```bash
# Web application
cd havite-web
npm install

# Bots
cd bots
npm install
```

## Available Commands

### Development

- **Web App**: `cd havite-web && npm run dev`
- **Bots**: `cd bots && npm run dev`

### Build & Deploy

- **Build Web**: `cd havite-web && npm run build`
- **Deploy Bots**: `cd bots && npm run deploy`

## Configuration

### Web App (`havite-web`)

Create a `.env.local` file in `havite-web` with:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
MISTRAL_API_KEY="your-mistral-api-key"
PERPLEXITY_API_KEY="your-perplexity-api-key"
```

### Bots (`bots`)

Configure your Cloudflare Workers secrets via `wrangler secret put`:

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `MISTRAL_API_KEY`

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Vercel AI SDK
- **Database**: Supabase (PostgreSQL)
- **AI**: Mistral AI, Perplexity AI
- **Bots**: Cloudflare Workers (scheduled tasks)
- **Authentication**: Supabase Auth

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
