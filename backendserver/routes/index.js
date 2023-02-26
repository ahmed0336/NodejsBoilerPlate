import  express  from "express";

const router = express.Router();

import { registerController ,loginController } from '../controllers';

// yahn se logic use kr skhte but we follow mvc model structure that why we use controllers
router.post('/register', registerController.register)

//logic api

router.post('/login', loginController.login)


 
 











export default router;