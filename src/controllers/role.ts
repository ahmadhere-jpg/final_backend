import { Role } from '../model/role';
import express from 'express';

const router = express.Router()

router.get('/all', async (req:express.Request, res:express.Response) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/new', async (req:express.Request, res:express.Response) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/update_roles/:id', async (req:express.Request, res:express.Response) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/delete_roles/:id', async (req:express.Request, res:express.Response) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
