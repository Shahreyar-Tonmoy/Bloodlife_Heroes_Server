import express from 'express';
import { verifyAdmin, verifySubAdmin } from '../middleware/verifyAdmin.js';
import verifyTokenMiddleware from '../middleware/authMiddleware.js';
const  AuthRouter = express.Router()

AuthRouter.get("/admin/:email",verifyTokenMiddleware,verifyAdmin)
AuthRouter.get("/sub-admin/:email",verifyTokenMiddleware,verifySubAdmin)


export {AuthRouter}