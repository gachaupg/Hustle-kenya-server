import UserModal from "../models/auth.js";
import userContents from "../models/userContents.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

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
export const Addlikes = async (req, res) => {
  const { id } = req.params;

  try {
  
    const likeObject = { _id: '64c21359c721da6ce2413034' };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { likes: likeObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






export const RemoveLike = async (req, res) => {
  const { id } = req.params;

  try {
    const likeIdToRemove = "64c21359c721da6ce241303a";

  
    await userContents.updateOne({ _id: id }, { $pull: { likes: likeIdToRemove } });
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const Adddislikes = async (req, res) => {
  const { id } = req.params;

  try {
   
    const likeObject = { _id: '64c21359c721da6ce241303f' };

    const updatedUserContent = await userContents.findByIdAndUpdate(
      id,
      {
        $addToSet: { dislikes: likeObject },
      },
      { new: true }
    );

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const RemovedisLike = async (req, res) => {
  const { id } = req.params;

  try {
    const likeIdToRemove = "64c21359c721da6ce241303a";

  
    await userContents.updateOne({ _id: id }, { $pull: { dislikes: likeIdToRemove } });
    const updatedUserContent = await userContents.findById(id);

    res.json(updatedUserContent);
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ error: "Internal server error" });
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
