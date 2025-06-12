import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatar:{
    type: String,
   
  }
  
},{
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;

// This code defines a Mongoose schema for a User model in a Node.js application.
// The schema includes fields for username, email, and password, all of which are required.
// The username and email fields are also set to be unique, ensuring that no two users can have the same username or email address.
// The schema also includes timestamps, which automatically adds createdAt and updatedAt fields to the documents.
// Finally, the User model is created from the schema and exported for use in other parts of the application.
// This model can be used to interact with a MongoDB database, allowing for operations such as creating, reading, updating, and deleting user records.