import express from 'express';
import { addRegion, getRegion } from '../controller/region.js';



const  RegionRouter = express.Router();


RegionRouter.post("/add-region",addRegion)
RegionRouter.get("/get-region",getRegion)


export {RegionRouter}