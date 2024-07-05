# Étape de construction
FROM node:18-alpine AS builder

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration
COPY package.json yarn.lock ./

# Installation des dépendances du projet
RUN yarn install --frozen-lockfile

# Copie des fichiers sources (code)
COPY . .

# Build du projet
RUN yarn build

# Étape de production
FROM node:18-alpine

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json start.sh ./

# Création du répertoire de stockage des données
RUN mkdir -p /app/data

# Attribution des droits d'exécution au script de démarrage
RUN chmod +x start.sh

## Exposition du port de l'application
#EXPOSE 8004

# Commande de démarrage du conteneur
CMD ["./start.sh"]
