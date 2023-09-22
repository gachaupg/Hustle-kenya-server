import meassageModal from "../models/messageModal.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new meassageModal({
    chatId,
    senderId,
    text,
    // img,
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await meassageModal.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ooops !! Data not found" });
  }
};
