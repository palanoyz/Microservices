import { Schema, model } from "mongoose";

// Define Mongoose schema and model for the todo collection
const TodoSchema = new Schema(
  {
    time: { type: String, required: true, unique: true },
    task: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Todo = model("Todo", TodoSchema);