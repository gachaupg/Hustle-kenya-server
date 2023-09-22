import moment from 'moment';
import mongoose from 'mongoose';
import cron from 'node-cron';
const { ObjectId } = mongoose.Types;



const userContentSchema = mongoose.Schema({
  title: { type: String },
  userName: { type: String },
  video: { type: String },
 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: ObjectId, ref: 'User' }],
  dislikes: [{ type: ObjectId, ref: 'User' }],
  comments: [],
   phone: { type: Number },
   
  description: { type: String },
  creator: { type: String },
  category: { type: String },
  images: { type: Array },
  hashtags: { type: String },
  twitter: { type: String },
  whatsapp: { type: String },
  instagram: { type: String },
  remarks: { type: String },
  additionalInfo: { type: String },
  timeSinceUpload: { type: String },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  brand: { type: String },
    feature: { type: String },
    feature1: { type: String },
    feature2: { type: String },
    feature3: { type: String },
    feature4: { type: String },
    specifications: { type: String },
    specifications1: { type: String },
    specifications2: { type: String },
    specifications3: { type: String },
    specifications4: { type: String },
    tell: { type: Number },
    images: { type: Array },
    price: { type: Number },
    age: { type: Number },
    discountPrice: { type: Number },
    discountPercentage: { type: Number },
    stock:{type:Number},
    userId: {
      type: String,
      // required: true,
    },
}, { timestamps: true });


cron.schedule('* * * * *', async () => {
  const currentTime = moment();

  // Find documents and update timeSinceUpload property
  const documents = await userContent.find();
  documents.forEach(async (doc) => {
    const createdAt = moment(doc.createdAt);
    const duration = moment.duration(currentTime.diff(createdAt));
    const minutes = Math.floor(duration.asMinutes());

    doc.timeSinceUpload = minutes;
    await doc.save();
  });
});

const userContent = mongoose.model("userVedeoContents", userContentSchema);

export default userContent;
