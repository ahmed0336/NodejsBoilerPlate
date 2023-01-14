import  express  from "express";

const router = express.Router();

import { registerController } from '../controllers';

// yahn se logic use kr skhte but we follow mvc model structure that why we use controllers
router.post('/register', registerController.register)


 
 











export default router;