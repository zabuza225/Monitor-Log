const fs = require('fs');
const connection = require('./src/services/db/dbConfig.js'); // Importez la configuration de la connexion
const saveLogs = require('./src/services/saveLogsToDatabase.js');

//je recupre mon fichier log ./var/log/dev.log
const filePath = 'dev.log';

// Nombre de lignes minimum pour déclencher l'enregistrement
const minimumLines = 20;

// Vérifier si le fichier existe
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Le fichier n'a pas été trouvé :", err);
      return;
    }

    // Lire le fichier log
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return;
      }

      const logs = data.split('\n').filter(line => line.trim() !== '');

      // Vérifier si le nombre de lignes dépasse le seuil minimum
      if (logs.length >= minimumLines) {
        // Diviser les lignes du fichier
        const lines = data.split('\n');

        // Parcourir chaque ligne
        saveLogs(filePath,lines,connection, fs);

      }else {
        console.log('Le nombre de lignes dans le fichier de logs est inférieur au seuil minimum.');
      }
      
    });
})
