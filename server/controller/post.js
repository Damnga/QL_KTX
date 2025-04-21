import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser,getUserById} from '../model/post.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const image = req.file?.filename || null;
  await createUser({ username, email, password: hashed, image });
  res.json({ message: 'User created' });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id },"secret", { expiresIn: '1h' });
  req.session.user = user; 
  res.json({ token, user });
};
export const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};
export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};
export const getUserId = async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};
export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const image = req.file?.filename;
      await updateUser(id, { ...req.body, image });
      res.json({ message: 'User updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Update failed' });
    }
};
export const remove = async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};
