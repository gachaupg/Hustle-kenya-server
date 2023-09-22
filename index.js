import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routes/auth.js";
import authRoute from "./routes/authSocial.js";
import userContentsRouter from "./routes/Products.js";
import commentsRouter from "./routes/Products.js";
import podicastRouter from "./routes/scripts.js";
import messageRouter from "./routes/message.js";
import chatRouter from "./routes/chats.js";
import bodyParser from "body-parser";
import passportSetup from "passport";
import  cookieSession from "cookie-session";

// cross origin options
import  passport from "passport";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

// port 
const PORT = process.env.PORT;

// middlewares


app.set("view engine", "ejs");
dotenv.config();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cors(corsOptions));

// welcome route

app.get("/", (req, res) => {
  res.send("hello andrew kibe app");
});

// all apis
app.use("/auth", authRoute);
app.use("/users", userRouter);
app.use('/products',userContentsRouter)
app.use('/comments', commentsRouter)
app.use('/scripts', podicastRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)
// mongo db  conecctions

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is  running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
