/* eslint-disable import/extensions */

import express from 'express';

const router = express.Router();

router.get('/', () => {
  router.sendStatus(200);
});

export default router;
