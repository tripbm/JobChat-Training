import mongoose from 'mongoose';

var groupMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    type: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
groupMessageSchema.index({ name: 1 });

export default mongoose.model('GroupMessage', groupMessageSchema);
