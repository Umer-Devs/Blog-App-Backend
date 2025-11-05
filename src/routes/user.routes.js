import express from 'express';
import { blogData, getBlogData, home, userLogin, userSignIn } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/signin', userSignIn);
router.post('/login', userLogin);
router.post('/blog', blogData);
router.get('/blog', getBlogData);
router.get('/', home);

export {router}
