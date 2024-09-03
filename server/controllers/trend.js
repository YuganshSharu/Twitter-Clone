import Trend from "../models/Trend.js";
import { handleError } from "../error.js";

export const createTrend = async (req, res, next) => {
  try {
    const existingTrend = await Trend.findOne({ name: req.body.name });
    if (existingTrend) {
      existingTrend.tweets.push(req.body.tweets[0]);
      const updatedTrend = await existingTrend.save();
      res.status(200).json(updatedTrend);
    } else {
      const newTrend = new Trend(req.body);
      const saveTrend = await newTrend.save();
      res.status(200).json(saveTrend);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const deleteTrend = async (req, res, next) => {
  try {
    const tweet = await Trend.findById(req.params.id);
    await tweet.deleteOne();
    res.status(200).json("trend has been deleted");
  } catch (err) {
    handleError(500, err);
  }
};

export const getTrendsList = async (req, res, next) => {
  try {
    const topTrends = await Trend.aggregate([
      {
        $project: {
          name: 1,
          tweetsCount: { $size: "$tweets" },
        },
      },
      {
        $sort: { tweetsCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    res.status(200).json(topTrends);
  } catch (err) {
    handleError(500, err);
  }
};

export const getTrendInfo = async (req, res, next) => {
  try {
    const trend = await Trend.findById(req.params.id);
    res.status(200).json(trend);
  } catch (err) {
    handleError(err);
  }
};
