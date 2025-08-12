#!/bin/bash
set -e  # Stopper le script en cas d'erreur

# --- Chargement des variables d'environnement ---
if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport
else
    echo "❌ Fichier .env introuvable"
    exit 1
fi

# Vérifier que le token est présent
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN manquant dans .env"
    exit 1
fi

# --- Définition du titre et nom de branche ---
if [ -n "$1" ]; then
    PR_TITLE="$1"
else
    PR_TITLE="Mise à jour automatique - $(date '+%Y-%m-%d %H:%M')"
fi

# Conversion en kebab-case : minuscules, tirets, max 50 caractères
NEW_BRANCH=$(echo "$PR_TITLE" | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g' \
    | sed 's/^-*//;s/-*$//' \
    | cut -c1-50)

# --- CONFIG ---
REPO="titouancv/Havite"
BASE_BRANCH="main"
PR_BODY="Cette PR ajoute une nouvelle fonctionnalité importante."
# ----------------

echo "📌 Titre de la PR : $PR_TITLE"
echo "📌 Nom de la branche : $NEW_BRANCH"

# Config Git si manquante
git config --global user.name >/dev/null 2>&1 || git config --global user.name "AutoBot"
git config --global user.email >/dev/null 2>&1 || git config --global user.email "autobot@example.com"

# --- Synchronisation avec la branche principale ---
git checkout "$BASE_BRANCH"
git pull origin "$BASE_BRANCH"

if git show-ref --verify --quiet refs/heads/"$NEW_BRANCH"; then
    echo "🔄 La branche '$NEW_BRANCH' existe déjà, on y switch."
    git checkout "$NEW_BRANCH"
else
    git checkout -b "$NEW_BRANCH"
fi

# --- Création du commit ---
if git diff --quiet HEAD; then
    echo "ℹ️ Aucun changement détecté — création d'un commit vide."
    git commit --allow-empty -m "Commit automatique ($(date '+%Y-%m-%d %H:%M:%S'))"
else
    echo "✅ Des changements détectés — commit automatique."
    git add -A
    git commit -m "Commit automatique ($(date '+%Y-%m-%d %H:%M:%S'))"
fi

# --- Push ---
git push origin "$NEW_BRANCH"

# --- Vérifier si une PR existe déjà ---
existing_pr=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/pulls?head=$(echo $REPO | cut -d'/' -f1):$NEW_BRANCH&state=open" \
    | jq -r '.[0].html_url')

if [ "$existing_pr" != "null" ] && [ -n "$existing_pr" ]; then
    echo "⚠️ Une PR existe déjà : $existing_pr"
    exit 0
fi

# --- Créer la Pull Request ---
response=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
    -X POST \
    -d "$(jq -n \
        --arg title "$PR_TITLE" \
        --arg head "$NEW_BRANCH" \
        --arg base "$BASE_BRANCH" \
        --arg body "$PR_BODY" \
        '{title: $title, head: $head, base: $base, body: $body}')" \
    "https://api.github.com/repos/$REPO/pulls")

# --- Récupérer l'URL ---
pr_url=$(echo "$response" | jq -r '.html_url')

if [ "$pr_url" != "null" ]; then
    echo "✅ Pull Request créée : $pr_url"
else
    echo "❌ Erreur lors de la création :"
    echo "$response"
fi
