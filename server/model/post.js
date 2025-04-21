import db from '../config/database.js';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM post');
  return rows;
};

export const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM post WHERE email = ?', [email]);
  return rows[0];
};
export const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM post WHERE id = ?', [id]);
    return rows[0];
  };
export const createUser = async (user) => {
  const { username, email, password, image } = user;
  await db.query('INSERT INTO post (username, email, password, anh) VALUES (?, ?, ?, ?)', [username, email, password, image]);
};

export const updateUser = async (id, newUser) => {
  const [rows] = await getUserById(id);
  const oldUser = rows[0];
  if (!oldUser) throw new Error('User not found');
  const username = newUser.username || oldUser.username;
  const email = newUser.email || oldUser.email;
  const image = newUser.image || oldUser.anh;
  await db.query(
    'UPDATE post SET username = ?, email = ?, anh = ? WHERE id = ?',
    [username, email, image, id]
  );
};

export const deleteUser = async (id) => {
  await db.query('DELETE FROM post WHERE id = ?', [id]);
};
