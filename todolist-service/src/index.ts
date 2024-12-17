import { Elysia } from "elysia";
import { readFileSync, writeFileSync } from "fs";

interface TodoRequestBody {
  time: string;
  task: string;
}

const app = new Elysia();

const DATA_FILE = "./data.json";

// Function to load data
const loadData = () => JSON.parse(readFileSync(DATA_FILE, "utf-8"));
// Function to save data
const saveData = (data: any) =>
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// create todo
app.post("/todos", async ({ body }) => {
  const { time, task } = (await body) as TodoRequestBody;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  const data = loadData();
  const todo = data["todo-list"].find(
    (item: string) => Object.keys(item)[0] === time
  );

  if (todo) {
    todo[time] = task; // Update the existing task
  } else {
    data["todo-list"].push({ [time]: task }); // Add a new task
  }

  // update data.json
  saveData(data);

  return {
    message: "Task added/updated successfully",
    todos: data["todo-list"],
  };
});

// Edit an existing todo
app.put("/todos", async ({ body }) => {
  const { time, task } = (await body) as TodoRequestBody;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  const data = loadData();
  const todo = data["todo-list"].find(
    (item: any) => Object.keys(item)[0] === time
  );

  if (todo) {
    todo[time] = task; // Update the task
    saveData(data);
    return { message: "Task updated successfully", todos: data["todo-list"] };
  } else {
    return { error: "Task not found for the given time" };
  }
});

// Delete a todo
app.delete("/todos", async ({ body }) => {
  const { time } = (await body) as TodoRequestBody;

  if (!time) {
    return { error: "Time is required" };
  }

  const data = loadData();
  const index = data["todo-list"].findIndex(
    (item: any) => Object.keys(item)[0] === time
  );

  if (index !== -1) {
    data["todo-list"].splice(index, 1); // Remove the task
    saveData(data);
    return { message: "Task deleted successfully", todos: data["todo-list"] };
  } else {
    return { error: "Task not found for the given time" };
  }
});

// Start the server
app.listen(3000, () =>
  console.log("Elysia server running on http://localhost:3000 🚀")
);
