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
import { verifyAccess } from '../middlewares/index.js';

const router = express.Router();

router.post('/add-contact', verifyAccess, addContact);
router.post('/add-contacts', verifyAccess, addContacts);

router.delete('/remove-contact', verifyAccess, removeContact);
router.delete('/remove-contacts', verifyAccess, removeContacts);

router.patch('/update-contact', verifyAccess, updateSingleContact);

router.get('/get-contacts', verifyAccess, getAllContacts);
router.get('/get-contact/:id', verifyAccess, getSingleContact);

export default router;
