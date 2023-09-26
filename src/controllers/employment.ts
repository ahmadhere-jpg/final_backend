import { Employment } from '../model/employment';
import express from 'express'

const router = express.Router()

router.get('/all',async (req:express.Request, res:express.Response) => {
  try {
    const employments = await Employment.find()
      .populate('employeeId')
      .populate('roleName')
      .populate('supervisorId');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/new',async (req:express.Request, res:express.Response) => {
  try {
    const existing = await Employment.findOne({ 
      employeeId: req.body.employeeId
    });
  
    if (existing) {
      return res.status(400).send('Employment record already exists for this employee');
    }
    const newEmployment = await Employment.create(req.body);
    const checkInTimestamp = Date.parse(req.body.startDate);
    const checkOutTimestamp = Date.parse(req.body.endDate);
    const contractduration = ((checkInTimestamp-checkOutTimestamp)/ (1000 * 60 * 60*24));
    if(contractduration<1)
    {
      res.status(400).send('Wrong contract duration')
    }
    res.status(201).json(newEmployment);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/update_employments/:id', async (req:express.Request, res:express.Response) => {
  try {
    const updatedEmployment = await Employment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployment);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/delete_employments/:id', async (req:express.Request, res:express.Response) => {
  try {
    await Employment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employment details deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});


module.exports = router;