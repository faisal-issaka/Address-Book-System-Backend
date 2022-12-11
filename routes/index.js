/* eslint-disable import/extensions */

import express from 'express';

const router = express.Router();

router.get('/', () => {
  router.redirect('/register');
});

export default router;
