const Catagory = require("../models/catagory")

exports.createCategory = async (req,res)=>{
    try {
        const{name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                msg:"All fields are required"
            })
        }
        await Catagory.create({
            name:name,
            description:description
        })
        return res.status(200).json({
            success:true,
            msg:"Catagory created successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Something went wrong, while creating Catagorys"
        })
    }
}

//getAllTags

exports.showAllCategories = async(req,res) =>{
    try {
        const allCatagorys = await Catagory.find({},
                            {name:true , description:true}
        )
        res.status(200).json({ 
            success:true,
            msg:"All Catagorys returned successfully",
            allCatagorys
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            msg:"Error occured in show all Catagorys"
        })
    }
}

//get catagory detail 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
     
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }