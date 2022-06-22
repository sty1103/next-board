import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  num: { type: Number, default: 0 },
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: String, require: true },
  date: { type: Date, default: Date.now },
}, {
  collection: 'post',
  versionKey: false
});

export default mongoose.models?.post || mongoose.model('post', PostSchema);