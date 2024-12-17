import { Elysia } from "elysia";
import { readFileSync } from "fs";

interface TodoList {
  [key: string]: string;
}

const DATA_FILE = "../data.json";

const loadTodos = (): TodoList[] => {
  const data = JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  return data["todo-list"];
};

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/todos", () => loadTodos())
  .get("/todos/:time", ({ params }) => {
    const todos = loadTodos();
    const slot = todos.find((todo) => todo[params.time] !== undefined);
    return slot || { message: "Time slot not found" };
  })
  .listen(3002); // Run on port 3002

console.log(`Elysia server running on http://localhost:3002 🚀`);
