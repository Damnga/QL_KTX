import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');


async function authorize(callback) {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('👉 Mở URL này trên trình duyệt để xác thực:\n', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Nhập code: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('❌ Lỗi lấy token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('✅ Token đã lưu');
        callback(oAuth2Client);
      });
    });
  }
}

export async function uploadFile(filePath) {
  authorize(async (auth) => {
    const drive = google.drive({ version: 'v3', auth });
    const fileName = path.basename(filePath);

    const fileMetadata = { name: fileName };
    const media = {
      mimeType: 'application/zip', 
      body: fs.createReadStream(filePath),
    };

    try {
      const res = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });
      console.log(`✅ Đã upload: ${fileName} (id: ${res.data.id})`);
    } catch (err) {
      console.error('❌ Lỗi upload:', err);
    }
  });
}
