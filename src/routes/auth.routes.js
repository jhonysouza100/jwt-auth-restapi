import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";

// middlewares
import { verifySignup } from '../middlewares/index.js';

const {checkRolesExists, checkDuplicateRecord} = verifySignup;

const router = Router();

router.post('/signin', signin);
router.post('/signup', [checkRolesExists, checkDuplicateRecord], signup);

export default router;