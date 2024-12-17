import { Elysia } from "elysia";
import mockdata from "../../data.json"; // Importing the mock data

interface TodoRequestBody {
  time: string;
  task?: string; // Optional because DELETE only needs time
}

const app = new Elysia();

// Function to simulate saving data (in-memory update for now)
const saveData = (data: any) => {
  // This function won't actually save data to a file in this version
  // You would need a method to save the data to disk (like `fs.writeFileSync`) if you wish
  console.log("Simulated saving data:", JSON.stringify(data, null, 2));
};

// Create a new todo or update an existing one
app.post("/todos", async ({ body }) => {
  const { time, task } = (await body) as TodoRequestBody;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  const todo = mockdata["todo-list"].find(
    (item: any) => Object.keys(item)[0] === time
  );

  if (todo) {
    todo[time] = task; // Update the existing task
  } else {
    mockdata["todo-list"].push({ [time]: task }); // Add a new task
  }

  saveData(mockdata); // Simulate saving the updated data

  return {
    message: "Task added/updated successfully",
    todos: mockdata["todo-list"],
  };
});

// Edit an existing todo
app.put("/todos", async ({ body }) => {
  const { time, task } = (await body) as TodoRequestBody;

  if (!time || !task) {
    return { error: "Time and task are required" };
  }

  const todo = mockdata["todo-list"].find(
    (item: any) => Object.keys(item)[0] === time
  );

  if (todo) {
    todo[time:any] = task; // Update the task
    saveData(mockdata); // Simulate saving the updated data
    return {
      message: "Task updated successfully",
      todos: mockdata["todo-list"],
    };
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

  const index = mockdata["todo-list"].findIndex(
    (item: any) => Object.keys(item)[0] === time
  );

  if (index !== -1) {
    mockdata["todo-list"].splice(index, 1); // Remove the task
    saveData(mockdata); // Simulate saving the updated data
    return {
      message: "Task deleted successfully",
      todos: mockdata["todo-list"],
    };
  } else {
    return { error: "Task not found for the given time" };
  }
});

// Start the server
app.listen(3003, () =>
  console.log("Elysia server running on http://localhost:3003 🚀")
);
