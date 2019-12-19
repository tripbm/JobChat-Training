import mongoose from 'mongoose';
import { typeGroupChat, typeGroupChatDefault } from '../../config';
var groupChatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    type: {
      type: String,
      enum: typeGroupChat,
      default: typeGroupChatDefault,
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
export default mongoose.model('GroupChat', groupChatSchema);
