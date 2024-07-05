#!/bin/bash

# Demander le nom d'utilisateur Docker Hub si non fourni
if [ -z "$DOCKER_HUB_USERNAME" ]; then
    read -p "Entrez votre nom d'utilisateur Docker Hub: " DOCKER_HUB_USERNAME
fi

# S'assurer que l'utilisateur est connecté à Docker Hub
echo "Connexion à Docker Hub..."
docker login

# Fonction pour construire et pousser l'image
build_and_push() {
    local version=$1
    echo "Construction et push de l'image version $version..."
    docker build -t $DOCKER_HUB_USERNAME/blog-api:$version .
    docker tag $DOCKER_HUB_USERNAME/blog-api:$version $DOCKER_HUB_USERNAME/blog-api:latest
    docker push $DOCKER_HUB_USERNAME/blog-api:$version
    docker push $DOCKER_HUB_USERNAME/blog-api:latest
}

# Fonction pour déployer
deploy() {
    local version=$1
    echo "Déploiement de la version $version..."
    DOCKER_IMAGE_VERSION=$version DOCKER_HUB_USERNAME=$DOCKER_HUB_USERNAME envsubst < deployment.yaml | kubectl apply -f -
    kubectl apply -f service.yaml
}

# Vérifier si le fichier VERSION existe, sinon le créer
if [ ! -f VERSION ]; then
    echo "1.0.0" > VERSION
    echo "Fichier VERSION créé avec la version initiale 1.0.0"
fi

# Lire la version actuelle
CURRENT_VERSION=$(cat VERSION)

# Construire et déployer la version actuelle
build_and_push $CURRENT_VERSION
deploy $CURRENT_VERSION

# Si la version actuelle est 1.0.0, incrémenter pour la prochaine fois
if [ "$CURRENT_VERSION" == "1.0.0" ]; then
    NEW_VERSION="1.0.1"
    echo $NEW_VERSION > VERSION
    echo "Version incrémentée pour la prochaine release : $NEW_VERSION"
else
    # Incrémenter la version pour la prochaine release
    IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
    MAJOR=${VERSION_PARTS[0]}
    MINOR=${VERSION_PARTS[1]}
    PATCH=${VERSION_PARTS[2]}
    PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$PATCH"
    echo $NEW_VERSION > VERSION
    echo "Version incrémentée pour la prochaine release : $NEW_VERSION"
fi

echo "Processus de release terminé."
