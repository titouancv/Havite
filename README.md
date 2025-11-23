# Havite

Havite est une plateforme d'agrégation et de récapitulatif d'actualités technologiques, propulsée par l'intelligence artificielle.

## Structure du Projet

Le projet est organisé en monorepo avec les dossiers suivants :

- **`web/front`** : Application Frontend (React, Vite, TanStack Router/Query).
- **`web/services`** : Backend API (Next.js, tRPC, Prisma).
- **`news-bot`** : Bot de scraping et de génération de contenu (Node.js, OpenAI/Google GenAI).

## Prérequis

- Node.js (v20+ recommandé)
- npm (v10+)
- Une base de données PostgreSQL (pour le backend)

## Installation

À la racine du projet, installez toutes les dépendances :

```bash
npm install
```

## Commandes Disponibles

### Développement

- **Lancer tout (non implémenté, lancer séparément pour l'instant)**
- **Frontend** : `npm run dev:front`
- **Backend** : `npm run dev:services`
- **Bot** : `npm run dev:bot`

### Build & Lint

- **Build tout** : `npm run build:all`
- **Lint tout** : `npm run lint:all`

## Configuration

### Backend (`web/services`)
Créez un fichier `.env` dans `web/services` avec :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/havite"
```

### Bot (`news-bot`)
Créez un fichier `.env` dans `news-bot` avec vos clés API (OpenAI, Twitter, etc.).

## Contribution

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
