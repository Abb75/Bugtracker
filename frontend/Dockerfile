# Utilisez l'image Node.js
FROM node:latest

WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Commande pour démarrer l'application React
CMD ["npm", "start"]
