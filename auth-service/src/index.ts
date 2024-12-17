import { Elysia } from "elysia";
import mockdata from "../../data.json";

const auth = new Elysia();

auth
  .post("/login", ({ body }) => {
    const { username, password } = body as { username: string; password: string };
    const user = mockdata.accounts.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return { error: "Invalid username or password" };
    }
    return { message: "Login successful", username };
  })
  .get("/all-users", () => mockdata.accounts)
  .get("/user/:id", ({ params }) => {
    const { id } = params;
    const user = mockdata.accounts.find((user) => user.id === Number(id));
    if (!user) {
      return { error: "User not found" };
    }
    return { username: user.username };
  });


auth.listen(3001);
console.log("Auth service running on http://localhost:3001");
