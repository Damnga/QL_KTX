import db from '../config/database.js';

export const getAllToaNha = async () => {
  const [rows] = await db.query('SELECT * FROM toanha');
  return rows;
};
export const getToaNhaById = async (id) => {
    const [rows] = await db.query('SELECT * FROM toanha WHERE id = ?', [id]);
    return rows[0];
};
export const createToaNha = async (user) => {
  const { TenTN } = toanha;
  await db.query('INSERT INTO toanha (TenTN) VALUES (?)', [TenTN]);
};

export const updateToaNha = async (id, newToaNha) => {
  const [rows] = await getToaNhaById(id);
  const oldToaNha = rows[0];
  if (!oldToaNha) throw new Error('Toa Nha not found');
  const TenTN = newToaNha.TenTN || oldToaNha.TenTN;
  await db.query('UPDATE toanha SET TenTN = ?  WHERE id = ?', [TenTN,id]);
};

export const deleteToaNha = async (id) => {
  await db.query('DELETE FROM toanha WHERE id = ?', [id]);
};
