import { Elysia } from "elysia";
import mongoose from "mongoose";
// import { Todo } from "../../todolist-service/model/TodoModel";
import { Todo } from "../model/TodoModel";

const PORT = process.env.PORT || 3002;
const MONGOURI = String(process.env.MONGOURI) || "mongodb://localhost:27017/";
const app = new Elysia();

// Route to get all todos
app.get("/todos", async () => {
  try {
    const todos = await Todo.find({});
    return { todos };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { error: "Failed to fetch todos" };
  }
});

// Route to get todos by time
app.get("/todos/:time", async ({ params }) => {
  try {
    const { time } = params;
    const todo = await Todo.find({ time });
    return { success: true, todo };
  } catch (error) {
    console.error("Error fetching todo:", error);
    return { success: false, error: "Failed to fetch todo" };
  }
});



app.listen(PORT, async () => {
  await mongoose.connect(MONGOURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("Error connecting to MongoDB", error));
  console.log(`Get todolist service running on http://localhost:${PORT}`);
});