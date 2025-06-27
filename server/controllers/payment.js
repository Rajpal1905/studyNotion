    const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/user");
const MailSender = require("../utility/emailSender");
const CourseEnrollmentEmail = require("../mail/template/courseEnrollmentEmail");
const {mongoose } = require("mongoose");
const { verify } = require("jsonwebtoken");

exports.capturePayment = async (req, res) => {
    try {
        // Extract courseId and userId
        const { courseId } = req.body;
        const { userId } = req.user; 

        // Validate courseId
        if (!courseId) {
            return res.status(400).json({
                success: false,
                msg: "Please provide CourseId",
            });
        }

        // Check if course exists
        const courseExist = await Course.findById(courseId); 
        if (!courseExist) {
            return res.status(400).json({
                success: false,
                msg: "CourseId is not valid",
            });
        }

        // Check if user is already enrolled
        const uId = new mongoose.Types.ObjectId(userId); 
        if (courseExist.studentEnrollment.includes(uId)) {
            return res.status(400).json({
                success: false,
                msg: "User already paid for this course",
            });
        }
        const order = await instance.orders.create({
            amount: courseExist.price * 100, 
            currency: "INR",
            receipt: `course_${courseId}_${uId}`,
            notes: {
                courseId: courseId,
                userId: uId,
            },
        });
    
        
      
        // Save the order details to your database if needed

        return res.status(200).json({
            success: true,
            msg: "Payment order created successfully",
            course:courseExist.name,
            description:courseExist.courseDescription,
            receipt:order.id,
            amount:order.amount,
            currency:order.currency
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            msg: "Error while buying course",
        });
    }
};


exports.verifySignature = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
  
  // Send Payment Success Email
  exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  
  // enroll the student in the courses
  const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnroled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }