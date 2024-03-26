import { ActiveStatus, UserRole } from '@/utils/constants';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  status: {
    type: String,
    enum: ActiveStatus,
    default: "active",
  },
  lastSeen: Date,  
}, { timestamps: true });

const User = model('User', userSchema);

export default User;