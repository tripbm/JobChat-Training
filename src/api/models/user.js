import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: Number,
    user_name: {
        type: String,
        unique: true,
        required: true
      },
    password: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    firstName: String,
    lastName: String,
    birthday: Date,
    gender: Number,
    action: Boolean,
    role: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.model('User', userSchema);