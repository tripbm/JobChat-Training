import hasPass from '../../../src/utils/hashPass';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: Number,
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    birthday: Date,
    gender: Number,
    action: Boolean,
    role: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = await hasPass.hash(user.password);
  next();
});

export default mongoose.model('User', userSchema);
