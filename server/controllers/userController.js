import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";

//register

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, role, password } = await req.body;
  if (!firstName || !lastName || !email || !role || !password) {
    res.status(400).json({
      message: "PLease fill all data",
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status("400").json({
      message: "User exists, please login",
    });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
  });
  res.status(201).json({
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    token: generateToken(user._id),
  });
  const tok = await Token.findOne({ email });
  const randomNumber = crypto.randomInt(100000, 999999);
  const token1 = randomNumber.toString();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Hello",
    text: token1,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.status(400).json({
        message: "An error occures",
      });
      console.log("Error " + err);
    } else {
      console.log("Sent");
    }
  });
  if (tok) {
    const updateToken = await Token.findOneAndUpdate(
      { email: email },
      { email: email, token: token1 },
      { new: true }
    );
    if (updateToken) {
      res.status(200).json({
        message: "Sent",
      });
    } else {
      console.log(err);
    }
  } else {
    const token = await Token.create({
      email: email,
      token: token1,
    });
    if (token) {
      console.log("sent");
    } else {
      console.log(err);
    }
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please fill up all details",
    });
  }
  const user = await User.findOne({ email });
  console.log(user, "log user");
  if (!user) {
    res.status(404).json({
      message: "User doesn't exists",
    });
  } else if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Please confirm all data",
    });
  }
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) {
    res.status(400).json({
      message: "Please fill up all data",
    });
  }
  const userToken = await Token.findOne({ email: email });
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({
      message: "User doesn't exist",
    });
  }
  if (userToken.token == token) {
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { verified: true },
      { new: true }
    );
    await Token.findOneAndDelete({ email: email });
    if (updateUser) {
      res.status(200).json({
        message: "Verified!",
      });
    }
  } else {
    res.status(400).json({
      message: "Please check the code again or request for a new code",
    });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
