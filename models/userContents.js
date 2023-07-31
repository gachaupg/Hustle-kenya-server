import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const userContentSchema=  mongoose.Schema({
title:{type:String,required:true},
    title: { type: String, required: true },
    userName: { type: String},
    vedeo: { type: String},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [],
    views: { type: Number, default: 0 },
    description: { type: String },
    playList:[],
    creator:{type:String},
    category:{type:String},
    img:{type:String},
    hashtags:{type:String},
    userChanellLink: { type: String },
    socialMediaLinks: { type: String },
    playList: { type: String },
    contactDetails: { type: String },
    remarks: { type: String },
    additionalInfo: { type: String },
    date: { type: Date, default: new Date() },
createdAt: {
    type: Date,
    default: new Date(),
  },

},
{timestamps:true})

const userContent = mongoose.model("userVedeoContents", userContentSchema);

export default userContent;




// import mongoose from 'mongoose'

// const userContentSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   userName: { type: String },
//   video: { type: String },
//   likes: {
//     number: { type: Number, default: 0 },
//     userId: [{ type: String }], 
//   },
//   dislikes: { type: Number, default: 0 },
//   comments: [],
//   views: { type: Number, default: 0 },
//   description: { type: String },
//   playList: [],
//   creator: { type: String },
//   category: { type: String },
//   img: { type: String },
//   hashtags: { type: String },
//   userChannelLink: { type: String },
//   socialMediaLinks: { type: String },
//   contactDetails: { type: String },
//   remarks: { type: String },
//   additionalInfo: { type: String },
//   date: { type: Date, default: new Date() },
//   createdAt: { type: Date, default: new Date() },
// }, { timestamps: true });

// const userContent = mongoose.model("userVedeoContents", userContentSchema);

// export default userContent;








// // import mongoose from "mongoose";

// // const userContentSchema = mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     userName: { type: String},
// //     vedeo: { type: String, unique: true},
// //     likes: { type: Number, default: 0 },
// //     dislikes: { type: Number, default: 0 },
// //     comments: [],
// //     views: { type: Number, default: 0 },
// //     description: { type: String },
// //     playList:[],
// //     creator:{type:String},
// //     category:{type:String},
// //     img:{type:String},
// //     hashtags:{type:String},
// //     userChanellLink: { type: String },
// //     socialMediaLinks: { type: String },
// //     playList: { type: String },
// //     contactDetails: { type: String },
// //     remarks: { type: String },
// //     additionalInfo: { type: String },
// //     date: { type: Date, default: new Date() },
// //   },

// //   { timestamps: true }
// // );

// // export default mongoose.model("userContent", userContentSchema);
