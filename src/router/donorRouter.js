import express from 'express';
import { createDonor, getAdminStatus, getDonors } from '../controller/donor.js';
const  DonorRouter = express.Router()

DonorRouter.post("/add-donor",createDonor)
DonorRouter.get("/get-donors",getDonors)
DonorRouter.get('/check-admin-status/:email', getAdminStatus);

export {DonorRouter}