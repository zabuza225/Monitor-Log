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
          });

        }
    });
    });
})
