import mongoose from "mongoose";

 const TrendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    tweets: {
        type: Array,
        defaultValue: [],
    },
 }, {timestamps: true});

 export default mongoose.model("Trend", TrendSchema);