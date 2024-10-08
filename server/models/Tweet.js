 import mongoose from "mongoose";

 const TweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        max: 200,
    },
    like: {
        type: Array,
        defaultValue: [],
    },
    imageUrl: {
        type: String,
    },
 }, {timestamps: true});

 export default mongoose.model("Tweet", TweetSchema);