# Havite Web

The web application for Havite - an AI-powered tech news aggregation and summarization platform.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **UI**: React 19, Tailwind CSS 4
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai) with Mistral AI & Perplexity
- **Icons**: Lucide React
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase project

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
MISTRAL_API_KEY="your-mistral-api-key"
PERPLEXITY_API_KEY="your-perplexity-api-key"
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
havite-web/
├── api/              # API utilities and bot integrations
│   ├── bots/         # AI bot implementations (Mistral, Perplexity, Twitter)
│   └── cron/         # Scheduled tasks
├── app/              # Next.js App Router pages
│   ├── [slug]/       # Dynamic recap pages
│   ├── about/        # About page
│   ├── login/        # Authentication
│   └── profil/       # User profile
├── components/       # React components
│   └── ui/           # Reusable UI components
├── lib/              # Utilities and hooks
│   ├── contexts/     # React contexts (Auth, Modal)
│   └── hooks/        # Custom hooks
└── public/           # Static assets
```

## Features

- 📰 AI-generated tech news recaps
- 🔐 User authentication via Supabase
- 💬 Comments system
- 👍 Voting on recaps
- 🔗 Source attribution and linking

## Deployment

Deploy on [Vercel](https://vercel.com) for the best experience with Next.js:

```bash
npm run build
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
