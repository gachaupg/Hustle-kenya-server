import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phone: { type: String },
    country: { type: String },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    googleId: { type: String, required: false },
  },

  { timestamps: true }
);

export default mongoose.model("Auth", userSchema);
