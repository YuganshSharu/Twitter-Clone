import { handleError } from "../error.js";
import Tweet from "../models/Tweet.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(404, "You can only update your own account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      // if (currentUser) {
        await User.findByIdAndDelete(req.params.id);
        await Tweet.deleteMany({ userId: req.params.id });
      // }
      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(404, "You can only update your own account"));
  }
};

export const follow = async (req, res, next) => {
  try {
    const followingUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);
    if (!followingUser.followers.includes(req.body.id)) {
      await followingUser.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("following the user");
  } catch (err) {
    next(err);
  }
};

export const unfollow = async (req, res, next) => {
  try {
    const followedUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);
    if (currentUser.following.includes(req.params.id)) {
      await followedUser.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });
    } else {
      res.status(403).json("You are not following this user");
    }
    res.status(200).json("unfollowing the user");
  } catch (err) {
    next(err);
  }
};
