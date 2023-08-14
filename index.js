const fs = require('fs');
const mysql = require('mysql');

const filePath = 'dev.log';

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'logfile',
  });

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
        lines.forEach((line) => {
          // Extraire la date, le type d'alerte et le message
          const regex = /\[(.*?)\] (\w+\.\w+): (.*)/;
          const match = regex.exec(line);
          
          if (match) {
            const date = match[1];
            const typeAlerte = match[2];
            const message = match[3];

            // Enregistrer les données dans la base de données
            const query = 'INSERT INTO logs (date, type_alerte, message) VALUES (?, ?, ?)';
            const values = [date, typeAlerte, message];
            
            connection.query(query, values, (err, result) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log('Données enregistrées avec succès dans la base de données.');
              
              // Vider le fichier log après l'insertion en base de données
              if (lines.indexOf(line) === lines.length - 1) {
                fs.writeFile(filePath, '', (err) => {
                  if (err) {
                    console.error('Erreur lors de la vidange du fichier log :', err);
                  } else {
                    console.log('Le fichier log a été vidé avec succès.');
                  }

                  // Fermer la connexion à la base de données après avoir vidé le fichier log
                  connection.end();
                });
              }

            });


          }

        });
      }else {
        console.log('Le nombre de lignes dans le fichier de logs est inférieur au seuil minimum.');
      }
      
    });
})
