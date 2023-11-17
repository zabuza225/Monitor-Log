const express = require('express');
const router = express.Router();
const connection = require('./src/services/db/dbConfig.js');

// Route pour afficher le tableau de données
router.get('/data', (req, res) => {
  // Récupérer les données de la base de données
  const query = 'SELECT * FROM logs';
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    // Rendre la vue EJS et transmettre les données
    res.render('donnees', { logs: rows });
  });
});

module.exports = router;
