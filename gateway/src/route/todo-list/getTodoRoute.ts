import { Elysia } from "elysia";
import { getTodoService } from "../../lib/Axios";

const router = new Elysia().group("/get-todo", (app) =>
    app
        .get("/", async () => {
            const { data } = await getTodoService.get("/todos");
            return data;
        })
        .get("/:time", async ({ params }: { params: { time: string } }) => {
            const { time } = params;
            const { data } = await getTodoService.get(`/todos/${time}`);
            return data;
        })
);

export default router;
