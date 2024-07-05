#!/bin/bash

# Lecture de la version
VERSION=$(cat VERSION)

# Construire et pousser l'image
./build-and-push.sh

# Déployer avec la nouvelle version
IMAGE_VERSION=$VERSION envsubst < deployment.yaml | kubectl apply -f -
kubectl apply -f service.yaml

echo "Déploiement de la version $VERSION terminé."
