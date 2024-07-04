# Description: Fichier de configuration pour la création de l'image Docker
FROM node:18

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration
COPY package.json yarn.lock ./

# Installation des dépendances du projet
RUN yarn install --frozen-lockfile

# Copie des fichiers sources(code)
COPY . .

# Build du projet
RUN yarn build

# Attribution des droits d'exécution au script de démarrage
RUN chmod +x start.sh

# Commande de démarrage du conteneur
CMD ["./start.sh"]
