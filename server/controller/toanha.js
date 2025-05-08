import { getAllToaNha,createToaNha, updateToaNha, deleteToaNha,getToaNhaById} from '../model/toanha.js';

export const create = async (req, res) => {
    try {
        const { TenTN } = req.body;
        await createToaNha({ TenTN});
        res.json({ message: 'Toa Nha created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getData = async (req, res) => {
    try {
        const users = await getAllToaNha();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 
};
export const getDataId = async (req, res) => {
    try {
        const id = req.params.id;
        const toanha = await getToaNhaById(id);
        if (!toanha) 
            return res.status(404).json({ message: 'Toa Nha not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};
export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const TenTN = req.body;
      await updateToaNha(id, { ...req.body, TenTN });
      res.json({ message: 'Toa Nha updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const remove = async (req, res) => {
  await deleteToaNha(req.params.id);
  res.json({ message: 'Toa Nha deleted' });
};
