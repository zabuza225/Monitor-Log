// Fonction pour enregistrer les lignes de logs dans la base de données
function saveLogsToDatabase(filePath, lines, connection, fs) {
    /// Parcourir chaque ligne
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
}

// Exporter la fonction
module.exports = saveLogsToDatabase;
