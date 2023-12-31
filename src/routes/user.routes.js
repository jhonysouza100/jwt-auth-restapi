import { Router } from "express";
import {getUsers} from "../controllers/user.controller.js";
import { signup } from "../controllers/auth.controller.js";

// middlewares
import { authJwt, verifySignup } from '../middlewares/index.js';
const {verifyToken, isAdmin} = authJwt;
const {checkRolesExists, checkDuplicateRecord} = verifySignup;


const router = Router();

router.get('/', getUsers);

router.post('/', [verifyToken, isAdmin, checkRolesExists, checkDuplicateRecord], signup);

export default router;