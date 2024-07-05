#!/bin/sh

# Syncronisation des Models Objets en tables
yarn database:migrate

# On pré-rempli la base de données
yarn database:seed

# Démarre le serveur
node dist/server.js
