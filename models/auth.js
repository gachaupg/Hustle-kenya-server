import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phone: { type: String },
    img: { type: String },
    admin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export default mongoose.model("Auth", userSchema);
