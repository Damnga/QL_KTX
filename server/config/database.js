import mysql from 'mysql2/promise';
const db = await mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"quanly_ktx"
});

export default db;