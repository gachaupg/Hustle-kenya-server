import UserModal from "../models/auth.js";
import userContents from "../models/userContents.js";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  const userData = req.body;
  const user = req.body;

  const newUserContent = new userContents({
    ...userData,
    creator: req.userId,
    userName: user.userName,
    createdAt: new Date().toISOString(),
  });

  try {
    await newUserContent.save();
    res.status(201).json(newUserContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getAllUserContents = async (req, res) => {
  try {
    const userContent = await userContents.find();
    res.status(200).json(userContent);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getSingleUserContent = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userContents.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
export const getContentsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await userContents.find({ creator: id });
  res.status(200).json(userTours);
};

export const deleteUserContent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }
    await userContents.findByIdAndRemove(id);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const updateUserContent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    vedeo,
    category,
    hashtags,
    userChanellLink,
    socialMediaLinks,
    playList,
    contactDetails,
    remarks,
    additionalInfo,
    
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id}` });
    }

    const updateduser = {
      title,
    description,
    vedeo,
    category,
    hashtags,
    userChanellLink,
    socialMediaLinks,
    playList,
    contactDetails,
    remarks,
    additionalInfo,
      _id: id,
    };
    await userContents.findByIdAndUpdate(id, updateduser, { new: true });
    res.json(updateduser);
  } catch (error) {
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
