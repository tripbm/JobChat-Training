import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    messageId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    groupId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
messageSchema.index({ messageId: 1 });

export default mongoose.model('Message', messageSchema);
