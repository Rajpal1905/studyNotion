const RatingAndReview = require("../models/ratingAndReviews")
const User = require("../models/user")
const Course = require("../models/course")
const { mongoose } = require("mongoose")

//create rating
exports.createRating = async (req, res) => {
    try {
        const { userId } = req.user.id
        const { courseId, rating, review } = req.body
        const courseDetail = await Course.findOne(
            {
                _id: courseId,
                studentEnrollment: { $eleMatch: { $eq: userId } }
            }
        )
        if (!courseDetail) {
            return res.status(404).json({
                success: false,
                msg: "course detail not found."
            });
        }
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user: userId,
                course: courseId
            }
        )
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                msg: "Already reviewed"
            });
        }
        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId

        })
        await Course.findByIdAndUpdate({ _id: courseId }, {
            $push: {
                ratingAndReviews: ratingReview._id
            }
        }, { new: true })
        return res.status(200).json(
            {
                success: true,
                msg: "Rating and review created successfully",
                ratingReview
            }
        )


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while creating review."
        });
    }
}


//getaverage Rating

exports.getAverageRating = async (req, res) => {
    try {
        //get course id
        const { courseId } = req.body.courseId
        //calculate average rating

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ])
        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }

        return res.status(200).json({
            success: true,
            msg: "AverageRating is zero",
            averageRating: 0
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while geting average review."
        });
    }
}

exports.allRating = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .skip(skip)
            .limit(Number(limit))
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        return res.status(200).json({
            success: true,
            allReviews
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while geting all reviews."
        });
    }
}