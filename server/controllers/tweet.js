import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";
export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try{
        const saveTweet = await newTweet.save();
        res.status(200).json(saveTweet);
    }
    catch(err){
        handleError(500, err);
    }
};

export const deleteTweet = async (req, res, next) => {
    try{
        const tweet = await Tweet.findById(req.params.id);
        if(tweet.userId === req.body.id){
            await tweet.deleteOne();
            res.status(200).json("tweet has been deleted");
        }
        else{
            handleError(500,err);
        }
    }
    catch(err){
        handleError(500, err);
    }
};

export const likeOrDislike = async (req, res, next) => {
    try{
        const tweet = await Tweet.findById(req.params.id);
        if(!tweet.like.includes(req.body.id)){
            await tweet.updateOne({
                $push: {like: req.body.id}
            });
            res.status(200).json("tweet is liked");
        }
        else{
            await tweet.updateOne({
                $pull: {like: req.body.id}
            });
            res.status(200).json("tweet is disliked");
        }
    }
    catch(err){
        handleError(500, err);
    }
};

export const getAlltweets = async (req, res, next) => {
    try{
        const currentUser = await User.findById(req.params.id);
        const userTweet = await Tweet.find({userId: currentUser._id});
        const followersTweet = await Promise.all(currentUser.following.map((followerId) => {
            return Tweet.find({userId: followerId});
        }));
        res.status(200).json(userTweet.concat(... followersTweet));
    }
    catch(err){
        handleError(500, err);
    }
};

export const gretUserTweets = async (req, res, next) => {
    try{
        const userTweets = await Tweet.find({userId: req.params.id}).sort({
            createAt: -1,
        });
        res.status(200).json(userTweets);
    }
    catch(err){
        handleError(500, err);
    }
};

export const getExploreTweets = async (req, res, next) => {
    try{
        const exploreTweets = await Tweet.find({like: {$exists: true}}).sort({
            likes: -1,
        });
        res.status(200).json(exploreTweets);
    }
    catch(err){
        handleError(500, err);
    }
};
