import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true, },
    email: { type: String, unique: true, required: true },
    subscribers: { type: Number, default: 0 },
    subscribed: { type: Number, default: 0 },
    unSubscribed: { type: Number, default: 0 },
    password: { type: String },
    phone: { type: Number },
    country: { type: String },
    date: { type: Date, default: new Date() },

    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    googleId: { type: String, required: false },
  },

  { timestamps: true }
);

export default mongoose.model("Auth", userSchema);
