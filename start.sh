#!/bin/sh

# Démarre le serveur
yarn database:migrate

yarn database:seed

node dist/server.js

# Crée la base de données, les tables et pré-rempli
# la base de données de données

