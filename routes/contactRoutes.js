/* eslint-disable import/extensions */
import express from 'express';
import {
  addContact,
  addContacts,
  getSingleContact,
  getAllContacts,
  removeContact,
  removeContacts,
  updateSingleContact,
  // updateContacts,
} from '../controllers/contactControllers.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.post('/add-contact', verifyToken, addContact);
router.post('/add-contacts', verifyToken, addContacts);

router.delete('/remove-contact', verifyToken, removeContact);
router.delete('/remove-contacts', verifyToken, removeContacts);

router.patch('/update-contact', verifyToken, updateSingleContact);

router.get('/get-contacts', verifyToken, getAllContacts);
router.get('/get-contact/:id', verifyToken, getSingleContact);

export default router;
