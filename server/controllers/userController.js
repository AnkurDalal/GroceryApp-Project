import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword,cartItems: {} });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true, //prevent js to access the cookie
      secure: process.env.NODE_ENV === "production", //only send cookie over https in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //allow cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days(cookie expiration time)
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name, cartItems: user.cartItems },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true, //prevent js to access the cookie
      secure: process.env.NODE_ENV === "production", //only send cookie over https in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //allow cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days(cookie expiration time)
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name, cartItems: user.cartItems },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//check Auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//log out user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, //prevent js to access the cookie
      secure: process.env.NODE_ENV === "production", //only send cookie over https in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //allow cross-site cookie
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
