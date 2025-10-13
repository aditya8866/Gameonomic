import { validationResult } from "express-validator";
import userService from "../service/user.service.js";
import UserModel from "../models/user.model.js";
import { Resend } from "resend";


const registerUser = async (req, res, next) => {
  try {
    console.log("Register request received");

    // ✅ Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { firstname, lastname, email, password } = req.body;


    // ✅ Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }



    // ✅ Hash password correctly
    const hashPassword = await UserModel.hashPassword(password);
    // console.log("this is hashpassword",hashedPassword)

    // ✅ Create user record
    const user = await userService.createUser({
      firstname,
      email,
      hashPassword, // ✅ use correct field name

    });

    // ✅ Generate OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // ✅ Save OTP and expiry
    user.otp = otpCode;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // ✅ Initialize Resend safely (use env var)
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      // ✅ Send OTP to actual user's email
      await resend.emails.send({
        from: "Website <website@resend.dev>",
        to: "adityasaini63555@gmail.com",
        subject: "Verify your account",
        html: `
          <p>Hello ${firstname || "User"},</p>
          <p>Your OTP is <strong>${otpCode}</strong>. It will expire in 10 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        `,
      });
    } catch (error) {
      console.error("❌ Error sending OTP email:", error);
      // You can still allow signup and resend OTP later
    }



    // ✅ Respond success
    res.status(201).json({
      message: "User registered successfully. Please verify the OTP sent to your email.",
      email: user.email,
    });

  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password"); // ✅ fetch password explicitly
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // if (!user.isVerified) {
    //   return res.status(403).json({ message: "Please verify your account with OTP first." });
    // }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,   // adjust fields as needed
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.otp, otp)

    // check otp
    if (Number(user.otp) !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }


    // check expiry
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // mark verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("❌ OTP verification error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // req.user.id comes from authMiddleware after verifying JWT
    const user = await UserModel.findById(req.user.id).select("-password -otp -otpExpiry");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser, verifyOtp, getCurrentUser };

