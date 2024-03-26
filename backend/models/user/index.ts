import { Schema, model } from 'mongoose';

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

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
    enum: ["active", "inactive"],
    default: "active",
  },
  lastSeen: Date,  
}, { timestamps: true });

const User = model('User', userSchema);

export default User;