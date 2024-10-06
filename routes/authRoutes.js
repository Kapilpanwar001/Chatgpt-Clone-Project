import express from 'express';
import {  logoutController, registerController } from '../controllers/authController.js'; // Correct


// router object  
const router = express.Router();

//routes
//register
router.post('/register',registerController);

//login
router.post('/login');

//logout
router.post('/logout',logoutController);

export default router;