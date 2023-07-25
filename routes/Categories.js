import userContent from "../models/userContent.js";
// const {auth,isUser,isAdmin}=require('../middleware/auth')
import moment from "moment";
import express from "express";
const router = express.Router();

router.get("/football", async (req, res) => {
  const previosMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  // res.status(200).send(previosMonth)
  try {
    const users = await userContent.aggregate([
      { $match: { category: "football" } },
    ]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.get("/djmix", async (req, res) => {
  const previosMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  // res.status(200).send(previosMonth)
  try {
    const users = await userContent.aggregate([
      { $match: { category: "djmix" } },
    ]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.get("/live", async (req, res) => {
  const previosMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  // res.status(200).send(previosMonth)
  try {
    const users = await userContent.aggregate([
      { $match: { category: "live" } },
    ]);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
