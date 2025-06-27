const cloudinary = require("cloudinary").v2
exports.imageUploadToCloundinary = async (file, folder, height, quality) => {
    try {
        // Initialize options object with folder
        const options = { folder };

        // Add height and quality properties if provided
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }

        // Set the resource type to "auto"
        options.resource_type = "auto";

        // Upload the image to Cloudinary
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error(error);
        return {
            success: false,
            msg: "Error occurred while uploading data to Cloudinary"
        };
    }
};
