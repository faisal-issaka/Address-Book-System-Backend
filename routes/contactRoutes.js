/* eslint-disable import/extensions */
import express from 'express';
import {
  addContact,
  addContacts,
  getContacts,
  getContact,
  removeContact,
  removeContacts,
  updateContact,
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

router.post('/update-contact', verifyToken, validateCredentials, updateContact);
// router.post('/update-contacts', verifyToken, validateCredentials, updateContacts);

router.get('/get-contacts', verifyToken, validateCredentials, getContacts);
router.get('/get-contact/:id', verifyToken, validateCredentials, getContact);

export default router;
