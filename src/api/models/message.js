import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_id: Number,
    content: String,
    userId: Number,
    groupId: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('Message', messageSchema);