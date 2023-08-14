const fs = require('fs');

const filePath = 'dev.log';
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
        
        // Faire ce que vous souhaitez avec les données extraites
        // Par exemple, les enregistrer dans une base de données ou les afficher
        console.log('Date :', date);
        console.log('Type d\'alerte :', typeAlerte);
        console.log('Message :', message);
        console.log('------------------------');
        }
    });
    });
})
