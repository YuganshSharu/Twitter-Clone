import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createTweet, deleteTweet, likeOrDislike, getAlltweets, gretUserTweets, getExploreTweets } from '../controllers/tweet.js';


const router = express.Router();

// create a tweet
router.post('/', verifyToken, createTweet);

// delete a tweet
router.delete("/:id", verifyToken, deleteTweet);

// like or dislike a tweet
router.put("/:id/like", likeOrDislike);

//timeline tweets
router.get("/timeline/:id", getAlltweets);

// user tweet only
router.get("/user/all/:id", gretUserTweets);

//explore
router.get("/explore", getExploreTweets);

export default router;