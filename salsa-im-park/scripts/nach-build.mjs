// Kopiert server/htaccess als .htaccess in den fertigen Website-Ordner.
// (Die Datei liegt bewusst ohne Punkt im Projekt, damit sie beim Hochladen zu GitHub nicht verloren geht.)
import { copyFile } from 'node:fs/promises';
const ziel = process.argv[2] || 'dist';
await copyFile('server/htaccess', `${ziel}/.htaccess`);
console.log(`.htaccess nach ${ziel}/ kopiert.`);
