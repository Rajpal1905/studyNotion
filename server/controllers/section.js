const Section = require('../models/section');
const Course = require('../models/course');
const SubSection = require('../models/subSection'); 
const section = require('../models/section');

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // Check for required fields
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        // Create a new section
        const newSection = await Section.create({sectionName : sectionName});

        // Update the course with the new section ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId, // Use courseId directly instead of wrapping it in an object
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
        .populate({
            path: 'courseContent', // Populating courseContent (which references the Section model)
            populate: {
                path: 'subSection', // Populating subSection array within Section
                model: 'SubSection'
            }
        });

        // Check if the course was successfully updated
        if (!updatedCourseDetails) {
            return res.status(404).json({
                success: false,
                msg: "Course not found"
            });
        }

        return res.status(201).json({
            success: true,
            msg: "Course created successfully",
            newSection 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error in creating course"
        });
    }
};

exports.updateSection = async(req,res) => {
    try {
        
        //input data
        const {sectionName, sectionId} = req.body


        //validate data
        if(!sectionName|| !sectionId){
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        //update data   

        const section = await Section.findByIdAndUpdate({sectionId},
            {
                sectionName
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            msg: "Course update successfully",
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error in updating course"
        });
    }
}

exports.deleteSection = async(req,res)=>{
    try {
        const {sectionId} = req.params

        await Section.findByIdAndDelete(sectionId);
            
        return res.status(200).json({
            success:true,
            msg: "Course deleted successfully",
        })
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error in deleting course"
        });
    }
}