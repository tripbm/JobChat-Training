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
relationshipSchema.index({ messageId: 1 });

export default mongoose.model('Relation', relationshipSchema);
