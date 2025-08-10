#!/bin/bash
set -e  # Stopper le script en cas d'erreur

# Charger les variables depuis .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ Fichier .env introuvable"
    exit 1
fi

# Vérifier que le token est présent
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN manquant dans .env"
    exit 1
fi

# Définir le titre de la PR
if [ -n "$1" ]; then
    PR_TITLE="$1"
else
    PR_TITLE="Mise à jour automatique - $(date '+%Y-%m-%d %H:%M')"
fi

# Convertir le titre en PascalCase pour la branche
NEW_BRANCH=$(echo "$PR_TITLE" | sed -E 's/[^a-zA-Z0-9]+/ /g' | awk '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) tolower(substr($i,2)) }}1' | tr -d ' ')

# --- CONFIG ---
REPO="titouancv/Havite"
BASE_BRANCH="main"           # branche de base
PR_BODY="Cette PR ajoute une nouvelle fonctionnalité importante."
# ----------------

echo "📌 Titre de la PR : $PR_TITLE"
echo "📌 Nom de la branche : $NEW_BRANCH"

# 1. Créer et pousser la nouvelle branche
git checkout "$BASE_BRANCH"
git pull origin "$BASE_BRANCH"
git checkout -b "$NEW_BRANCH"
# ⚠️ Faire les modifications nécessaires ici avant le push
git push origin "$NEW_BRANCH"

# 2. Créer la Pull Request via API GitHub
response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -X POST \
    -d "$(jq -n \
        --arg title "$PR_TITLE" \
        --arg head "$NEW_BRANCH" \
        --arg base "$BASE_BRANCH" \
        --arg body "$PR_BODY" \
        '{title: $title, head: $head, base: $base, body: $body}')" \
    "https://api.github.com/repos/$REPO/pulls")

# 3. Récupérer l'URL de la PR
pr_url=$(echo "$response" | jq -r '.html_url')

if [ "$pr_url" != "null" ]; then
    echo "✅ Pull Request créée : $pr_url"
else
    echo "❌ Erreur lors de la création :"
    echo "$response"
fi
