import { Elysia } from "elysia";
import mongoose from "mongoose";
import { Todo } from "../model/TodoModel";

// Constants for environment variables
const PORT = Number(process.env.PORT) || 3003;
const MONGO_URI = process.env.MONGOURI || "mongodb://localhost:27017/";

// interface
interface ICreateTodo {
  body: {
    time: string;
    task: string;
  };
}

const app = new Elysia();

// Create a new todo or update an existing one
app.post("/todos", async ({ body }: ICreateTodo) => {
  const { time, task } = await body;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  try {
    const existingTodo = await Todo.findOne({ time });

    if (existingTodo) {
      // Update the existing task
      existingTodo.task = task;
      await existingTodo.save();
    } else {
      // Add a new task
      const todo = new Todo({ time, task });
      await todo.save();
    }

    const updatedTodos = await Todo.find();

    return {
      message: "Task added/updated successfully",
      todos: updatedTodos,
    };
  } catch (error) {
    console.error("Error in POST /todos:", error);
    return {
      error: "An error occurred while processing your request.",
    };
  }
});

// Edit an existing todo
app.put("/todos", async ({ body }: ICreateTodo) => {
  const { time, task } = await body;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { time },
      { task },
      { new: true } // Return the updated document
    );

    if (updatedTodo) {
      const updatedTodos = await Todo.find();
      return {
        message: "Task updated successfully",
        todos: updatedTodos,
      };
    } else {
      return { error: "Task not found for the given time" };
    }
  } catch (error) {
    console.error("Error in PUT /todos:", error);
    return { error: "An error occurred while processing your request." };
  }
});

// Delete a todo
app.delete("/todos", async ({ body }: ICreateTodo) => {
  const { time } = await body;

  if (!time) {
    return { error: "Time is required" };
  }

  try {
    const result = await Todo.findOneAndDelete({ time });

    if (result) {
      const updatedTodos = await Todo.find();
      return {
        message: "Task deleted successfully",
        todos: updatedTodos,
      };
    } else {
      return { error: "Task not found for the given time" };
    }
  } catch (error) {
    console.error("Error in DELETE /todos:", error);
    return { error: "An error occurred while processing your request." };
  }
});

// Start the server
app.listen(PORT, async () => {
  // Connect to MongoDB using Mongoose
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully with Mongoose!"))
    .catch((error) => console.error("Error connecting to MongoDB", error));

  console.log(`Todolist service running on http://localhost:${PORT}`);
});
