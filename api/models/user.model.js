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
    default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAwIBBAUH/8QAKRABAQACAQMDAwQDAQAAAAAAAAECAxESMVEEIXEyQYEiQmGREzNDFP/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAAAAAAAAAAAAAAAAAAAAAAAAAADljLZx7RO23uCtzx8s/wCSeKmAp/knh2bMfhIBeWXs68/LeOzj6gVHJeXQAAAAAAAAAAEs8+fadndmX2iYAAAOWyd7x8g6OTKXtZfiugAA1jlcb/Csss5iDWvLi8XsCwAAAAAAADlvE5dY232gJW83kAAGdmXRryy8QEd+/pvThff715rbbzbb8uXvaKC+nfcbJnecfPhAB9IR9Llzqs8VZAABbXecWktd4qoAAAAAACW3vFUtv1AwAAn6j/Tkozsx69eWPmA+eF9rRUAAen0fbN6UfS48a+fKyKAA7j9UXQneLgAAAAAAJ7Z2UZznOIIgAA5lljhOcrJP5BHfo6r1YT3+88vLZZeLLHrvqdc7dV+I5fU673xt/APJPdfTotsuc4x8eW56jVO2N/qNf+rDxl/QLDGGzHPtZ8dmwAAawn6osnqn3UAAAAAAAABHOdN/hlfLHqiNnHtQS3bJrx829o8WVuV5yvNb9Rl1bcvE9omAAqAAD1en3dX6c/q+18vK7jeLLO8FfRJOfZzG9Ul8zlbXjxPdBqTicOgAAAAAAAAAzljL8tAPk79WevO9U7+/P2TfZyxmU4ynMeXb6LG++u9N8XsDwC+Xpd2P7efipXDOd8Mp+FGRqYZX9uX9N4+n25dsL+fYEncccs704TmvXr9Df+mX4j169eGucYYyIM6Ndw14zLjmRUAAAAAAAAAAAAAAAAAcdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
  },
  
  
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