import express from "express";
import { RegisterUser} from "../controllers/registrationController.js";
import { LoginUser} from "../controllers/loginController.js";

const router = express.Router();

router.post("/register", RegisterUser);   // POST /api/register
router.post("/login", LoginUser);      // POST /api/login
// router.get("/users", getUsers);      // GET /api/users

export default router;
