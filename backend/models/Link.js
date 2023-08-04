import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  name: String,
  url: String,
//   logo: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.models.Link || mongoose.model('Link', LinkSchema);
