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
import {
  validateCredentials,
  verifyToken,
} from '../middlewares/index.js';

const router = express.Router();

router.post('/add-contact', verifyToken, validateCredentials, addContact);
router.post('/add-contacts', verifyToken, validateCredentials, addContacts);

router.delete('/remove-contact', verifyToken, validateCredentials, removeContact);
router.delete('/remove-contacts', verifyToken, validateCredentials, removeContacts);

router.patch('/update-contact', verifyToken, validateCredentials, updateSingleContact);

router.get('/get-contacts', verifyToken, validateCredentials, getAllContacts);
router.get('/get-contact/:id', verifyToken, validateCredentials, getSingleContact);

export default router;
