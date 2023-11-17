const express = require('express');
const app = express();
const port = 3000; // Remplacez par le port de votre choix
const router = require('./server_api');
// Définir les routes et la configuration de la base de données

app.use(router)
// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
