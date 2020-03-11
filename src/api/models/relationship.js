import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const relationshipSchema = new Schema({
  userReceiveId: {
    type: String,
    required: true,
  },
  userSendId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Relationships', relationshipSchema);
