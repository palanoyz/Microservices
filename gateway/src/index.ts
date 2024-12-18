import { Elysia } from "elysia";
import { authService, getTodolistService, todolistService } from "./lib/Axios";

// Create the Gateway app
const app = new Elysia();

//Auth Service
app.post("/register", async ({ body }) => {
  try {
    const response = await authService.post("/register", body);
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to register user",
      details: error.response?.data || error.message,
    };
  }
});
app.post("/login", async ({ body }) => {
  try {
    const response = await authService.post("/login", body);
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to login",
      details: error.response?.data || error.message,
    };
  }
});
app.get("/all-users", async () => {
  try {
    const response = await authService.get("/all-users");
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to fetch users",
      details: error.response?.data || error.message,
    };
  }
});

//GetTodoList Service
app.get("/todos", async () => {
  try {
    const response = await getTodolistService.get("/todos");
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to fetch todos",
      details: error.response?.data || error.message,
    };
  }
});
app.get("/todos/:time", async ({ params }) => {
  try {
    const response = await getTodolistService.get(`/todos/${params.time}`);
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to fetch todo by time",
      details: error.response?.data || error.message,
    };
  }
});

//TodoList Service
app.post("/todos", async ({ body }) => {
  try {
    const response = await todolistService.post("/todos", body);
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to add/update todo",
      details: error.response?.data || error.message,
    };
  }
});
app.put("/todos", async ({ body }) => {
  try {
    const response = await todolistService.put("/todos", body);
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to update todo",
      details: error.response?.data || error.message,
    };
  }
});
app.delete("/todos", async ({ body }) => {
  try {
    const response = await todolistService.delete("/todos", { data: body });
    return response.data;
  } catch (error: any) {
    return {
      error: "Failed to delete todo",
      details: error.response?.data || error.message,
    };
  }
});

// Start the Gateway Service
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🦊 Gateway Service running at http://localhost:${PORT}`);
});
