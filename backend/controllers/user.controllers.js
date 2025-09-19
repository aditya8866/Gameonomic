import { validationResult } from "express-validator";
import userService from "../service/user.service.js";
import UserModel from "../models/user.model.js";
import { Resend } from "resend";

const registerUser = async (req, res, next) => {
  try {
    console.log("Asdf")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { firstname, lastname, email, password } = req.body;

    // check user exists
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashPassword = await UserModel.hashPassword(password);

    // create user
    const user = await userService.createUser({
      firstname,
      lastname: lastname || "",
      email,
      hashPassword,
      isVerified: false,
    });

    console.log(email)

    // generate OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // save OTP + expiry to user
    user.otp = otpCode;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // send OTP email
const resend = new Resend('re_3WwFao5x_FzbgEiTZhijo7LV5tAX9N5vJ');    // try {
   
    try {
    const data = await resend.emails.send({
      from: 'Website <website@resend.dev>',
      to: [email],
      subject: 'Hello World',
      html: `<p>Hello ${firstname || "User"},</p>
              <p>Your OTP is <strong>${otpCode}</strong>. It will expire in 10 minutes.</p>`,
    });

  } catch (error) {
      console.error("Email send failed:", error);
    }


    res.status(201).json({
      message: "User registered. Please verify OTP sent to your email.",
      email: user.email, // frontend uses this to verify later
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your account with OTP first." });
    }

    const isMatch = await UserModel.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser,  loginUser };
