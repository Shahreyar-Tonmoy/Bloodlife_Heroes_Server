import express from 'express';
import { LastDonationDate, getDonationDate } from '../controller/lastDonationDate.js';
const  lastDonationDate = express.Router()

lastDonationDate.post("/last-donation-date/:email",LastDonationDate)
lastDonationDate.get("/get-donation-date/:email",getDonationDate)


export {lastDonationDate}