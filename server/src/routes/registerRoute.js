import express from "express";
import { RegisterUser} from "../controllers/registrationController.js";
import { LoginUser } from "../controllers/loginController.js";
import { PutComplaint } from "../controllers/userPanelController.js";
import { GetComplaintCount } from "../controllers/userPanelController.js";
import { GetAllComplaints } from "../controllers/userPanelController.js";

const router = express.Router();

router.post("/register", RegisterUser);   // POST /api/register
router.post("/login", LoginUser);      // POST /api/login
router.post("/user-dashboard/:userId", PutComplaint);      // POST /api/user-dashboard
router.get("/complaint-count/:userId", GetComplaintCount);      // GET /api/complaint-count/:userId
router.get("/all-complaints/:userId", GetAllComplaints);      // GET /api/all-complaints/:userId

export default router;
