#!/bin/sh

# Démarre le serveur
node dist/server.js

# Crée la base de données, les tables et pré-rempli
# la base de données de données
yarn database:seed

