const SubSection = require('../models/subSection')

const Section = require('../models/section')

require('dotenv').config()

const {imageUploadToCloundinary} = require('../utility/imageUplaoder')
const mongoose = require("mongoose")


exports.createSubSection = async (req, res) => {
  try {
    // Data fetch from body
    const { title, timeDuration, description, sectionId } = req.body;

    // Extract video file
    const video = req.files.videofile;

    // Validation
    if (!title || !timeDuration || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    // Upload to cloudinary
    const uploadDetails = await imageUploadToCloundinary(video, process.env.FOLDER_NAME);

    // Create the sub-section
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoUrl: uploadDetails.secure_url,
    });

    // Properly cast the sectionId to an ObjectId using 'new'
    const sectionObjectId = new mongoose.Types.ObjectId(sectionId);  // Use 'new' to instantiate ObjectId

    // Update the section with the new sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionObjectId, // Pass the sectionObjectId here
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate({
      path: 'subSection',
      model: 'SubSection',
    });

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        msg: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "SubSection created Successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error in creating subsection",
    });
  }
};
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }