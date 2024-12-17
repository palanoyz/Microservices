import { Elysia } from "elysia";
import mongoose from "mongoose";
import { UserModel } from "../model/UserModel";

const PORT = process.env.PORT || 3001;
const MONGOURI = String(process.env.MONGOURI);
const app = new Elysia();

app.post("/register", async ({ body }: { body: { username: string; password: string }}) => {
  const { username, password } = body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return { error: "User already exists" };
  }
  const result = new UserModel({ username, password });
  await result.save();
  return { message: "User registered successfully", username: result.username };
})

app.post("/login", async ({ body }: { body: { username: string; password: string }}) => {
  const { username, password } = body;
  const user = await UserModel.findOne({ username, password });
  if (!user) {
    return { error: "Invalid username or password" };
  }
  return { message: "Login successful", username: user.username };
});

app.get("/all-users", async () => {
  const users = await UserModel.find();
  return { users };
})

app.get("/user/:id", async ({ params }) => {
  const { id } = params;
  const user = await UserModel.findById(id);
  if (!user) {
    return { error: "User not found" };
  }
  return { username: user.username };
});



app.listen(PORT, async () => {
  await mongoose.connect(MONGOURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("Error connecting to MongoDB", error));
  console.log(`Auth service running on http://localhost:${PORT}`);
});
