const mongoose = require("mongoose")
const ballSchema = mongoose.Schema({
ball_type: String,
ball_size: Number,
ball_cost: Number,
})
module.exports = mongoose.model("Ball",
ballSchema)