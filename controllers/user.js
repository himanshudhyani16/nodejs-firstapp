import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";

export const getAllUser = async (req, resp) => {};

// login api
export const login = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email & pasword!", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid email & pasword!", 400));
    // send respond
    sendCookies(user, resp, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// register api
export const registerNewUser = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist!", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    // send respond
    sendCookies(user, resp, "Registered Sucessfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, resp) => {
  console.log("reqqqqqq", req.user);
  resp.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, resp) => {
  resp
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout",
    });
};
