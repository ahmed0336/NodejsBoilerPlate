import  express  from "express";

const router = express.Router();

import { registerController ,loginController, UserController } from '../controllers';

import auth from "../middleware/auth";

// yahn se logic use kr skhte but we follow mvc model structure that why we use controllers
router.post('/register', registerController.register)

//logic api

router.post('/login', loginController.login)


// after login show user data ,infro

router.get('/profile', auth ,UserController.me)
 
 











export default router;