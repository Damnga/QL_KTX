import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadFile } from './driveUploader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function backupImages() {
  const dateStr = new Date().toISOString().split('T')[0];
  const outputFolder = path.join(__dirname, 'backups');
  const outputFile = path.join(outputFolder, `backup-${dateStr}.zip`);

  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

  const uploadsFolder = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsFolder)) {
    throw new Error('Folder uploads không tồn tại');
  }

  const output = fs.createWriteStream(outputFile);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ File backup: ${outputFile}, total ${archive.pointer()} bytes`);
      uploadFile(outputFile);
      resolve();
    });

    output.on('error', err => reject(err));
    archive.on('error', err => reject(err));

    archive.pipe(output);

    archive.directory(uploadsFolder, false);

    archive.finalize();
  });
}
