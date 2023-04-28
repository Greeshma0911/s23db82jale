const mongoose = require("mongoose")
const ballSchema = mongoose.Schema({
ball_type: String,
ball_size: {type: Number, min:3},
ball_cost: {type: Number, maxlength:15}
})
module.exports = mongoose.model("Ball",
ballSchema)