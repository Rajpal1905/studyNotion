const Course = require("../models/course");
const User = require("../models/user");
const Catagory = require("../models/catagory");
const { imageUploadToCloundinary } = require("../utility/imageUplaoder");

// Create course handler function
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category } = req.body;

        // Check if required fields are present
        const thumbnail = req.files?.thumbnail;
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag ||!category ||!thumbnail) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required."
            });
        }

        const userId = req.user.id;

        // Check if instructor exists
        const instructorDetails = await User.findById(userId);
        
        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                msg: "Instructor not found."
            });
        }

        // Check if category exists
        const categoryDetails = await Catagory.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                msg: "catagory not found."
            });
        }

        // Upload image to Cloudinary
        const thumbnailImage = await imageUploadToCloundinary(thumbnail, process.env.FOLDER_NAME);

        // Create a new course entry
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        // Add the new course to the instructor's courses
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            }, { new: true }
        );
        // Add the new course to the catagory's courses
        await Catagory.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    course: newCourse._id
                }
            }, { new: true }
        );

        return res.status(200).json({
            success: true,
            msg: "Course created successfully.",
            newCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while creating the course."
        });
    }
};

// Get all courses handler function
exports.getAllCourses = async (req, res) => {
    try {
        // Fetch all courses with selected fields
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrollment: true
        })
            .populate("instructor") // Populate instructor details
            .exec();

        return res.status(200).json({
            success: true,
            msg: "All courses fetched successfully.",
            data: allCourses
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while fetching the courses."
        });
    }
};

exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
exports.getCourseDetail = async(req , res) => {
    try {
        const {courseId} = req.body;
        const courseDetail = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                    
                }
            )   
            .populate("catagory")
            // .populate("rating and reviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            })
        .exec()
            if(!courseDetail)
            {
                return res.status(400).json({
                    success:false,
                    msg:"Course deatail not found"
                })
            }
            return res.status(200).json({
                success:true,
                msg:"Course deatil fetch successfully",
                courseDetail
            })
            
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            err: error.message,
            msg: "An error occurred while fetching the course deatial."
        });
    }
}
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }