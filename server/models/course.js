const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
    }],
    price:{
        type:String,
    },
    tags:{
        type:[String],
        required:true
    },
    thumbnail:{
        type:String
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory"
    },
    studentEnrollment:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }   
    ],
    instructions:{
        type:[String]
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    },
    createdAt: {
		type:Date,
		default:Date.now
	},

})
module.exports = mongoose.model("Course",courseSchema)