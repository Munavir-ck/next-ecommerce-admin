// models/user.ts

import mongoose ,{ Document, Schema, model } from 'mongoose';

// Define the User interface representing a document in MongoDB
interface User extends Document {
  email: string;
  
}

// Define the User Schema
const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

});

// Create and export the User model
const UserModel = mongoose.models.Admin||mongoose.model<User>('Admin', userSchema);

export default UserModel;
