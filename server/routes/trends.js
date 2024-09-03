import express from 'express';
import { verifyToken } from '../verifyToken.js';
import {createTrend, deleteTrend, getTrendInfo, getTrendsList} from "../controllers/trend.js";

const router = express.Router();

// create a trend
router.post('/', verifyToken, createTrend);

// delete a trend
router.delete("/:id", verifyToken, deleteTrend);

//get list of all trend's name
router.get("/list/", getTrendsList);

// get info of trend
router.get("/find/:id", getTrendInfo);



export default router;