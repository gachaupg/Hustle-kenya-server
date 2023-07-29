import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModal from "../models/auth.js";
import nodemailer from "nodemailer";
import cloudinary from "../utils/cloudinary.js";

// jwt secret for token 

const secret =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// login api

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something in server is wrong" });
    console.log(error);
  }
};

// register api 'users must use their original emails

export const signup = async (req, res) => {
  const { email, password, phone, name,userName,date,subscribers,subscribed,unSubscribed, isAdmin, img, country } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if (img) {
    //   const uploadedResponse = await cloudinary.uploader.upload(img, {
    //     upload_preset: "peter-main",
    //   });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      unSubscribed,
      subscribers,
      subscribed,
      userName,
      password: hashedPassword,
      name,
      isAdmin,
      img,
      phone,
      country,
      date,
    });

    const token = jwt.sign(
      {
        phone: result.phone,
        email: result.email,
        country: result.country,
        img: result.img,
        id: result._id,
        isAdmin: result.isAdmin,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
    // }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// googleSignIn api

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// get all Users  api

export const getUsers = async (req, res) => {
  try {
    // const tours = await UserModal.find();
    // res.status(200).json(tours);

    const users = await UserModal.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModal.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }
    await UserModal.findByIdAndRemove(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, country, password, img, phone } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }

    const updateduser = {
      phone,
      email,
      country,
      password,
      img,
      name,
      _id: id,
    };
    await UserModal.findByIdAndUpdate(id, updateduser, { new: true });
    res.json(updateduser);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// forgotPassword api

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      res.status(404).json({ message: "user with that email does not exist" });
    }
    const resetToken = secret + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      resetToken,
      { expiresIn: "1hr" }
    );
    const link = `http://localhost:5000/users/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 587,
      auth: {
        user: "petergachau57@gmail.com",
        pass: "atgwlwufhipufmte",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var mailOptions = {
      from: "petergachau57@gmail.com",
      to: email,
      subject: "reset password",
      text: link,
    };
    // var mailOptions = {
    //   from: "youremail@gmail.com",
    //   to: "thedebugarena@gmail.com",
    //   subject: "Password Reset",
    //   text: link,
    // };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("success");
  } catch (error) {}
};

// password reset ui html ejs

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secretToken = secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secretToken);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

export const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secretToken = secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secretToken);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await UserModal.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    // res.json({ status: "password updated" });
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Not Verified" });
  }
};

// export const getToursByTag = async (req, res) => {
//   const { apartment } = req.params;
//   try {
//     const tours = await UserModal.find({ apartment: { $in: apartment } });
//     res.json(tours);
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

// export const getRelatedTours = async (req, res) => {
//   const tags = req.body;
//   try {
//     const tours = await UserModal.find({ tags: { $in: tags } });
//     res.json(tours);
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//   }
// };

// export const likeTour = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!req.userId) {
//       return res.json({ message: "User is not authenticated" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ message: `No tour exist with id: ${id}` });
//     }

//     const tour = await UserModal.findById(id);

//     const index = tour.likes.findIndex((id) => id === String(req.userId));

//     if (index === -1) {
//       tour.likes.push(req.userId);
//     } else {
//       tour.likes = tour.likes.filter((id) => id !== String(req.userId));
//     }

//     const updatedTour = await UserModal.findByIdAndUpdate(id, tour, {
//       new: true,
//     });

//     res.status(200).json(updatedTour);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
