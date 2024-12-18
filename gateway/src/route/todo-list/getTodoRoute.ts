import { Elysia } from "elysia";
import { todoService } from "../../lib/Axios";

const router = new Elysia().group("/todo", (app) =>
    app
        .get("/", async () => {
            const { data } = await todoService.get("/todos");
            return data;
        })
        .get("/:time", async ({ params }) => {
            const { time } = params;
            const { data } = await todoService.get(`/todos/${time}`);
            return data;
        })
);

export default router;
