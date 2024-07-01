import express from 'express';
import { filterBloodGroup, filterDonors } from '../controller/Filter.js';

const  FilterRouter = express.Router()

FilterRouter.get("/filter-donor",filterDonors)
FilterRouter.get("/blood-group/filter",filterBloodGroup)


export {FilterRouter}