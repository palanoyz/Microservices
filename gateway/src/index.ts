import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { swagger } from "@elysiajs/swagger";
import userRoute from "./route/user/userRoute";
import getTodoRoute from "./route/todo-list/getTodoRoute";
import todoRoute from "./route/todo-list/todoRoute";

const app = new Elysia()
  .use(jwt({
    name: "jwt",
    secret: "Pikachu, I choose you!"
  }))
  .use(cookie()).use(swagger({
    path: "/api-docs",
  }))

app.get("/", () => "Gate Open KAIHO!");

app.use(userRoute);
app.use(getTodoRoute);
app.use(todoRoute);

app.listen(3000);
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
