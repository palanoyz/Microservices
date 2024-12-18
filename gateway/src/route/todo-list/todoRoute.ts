import { Elysia } from "elysia";
import { todoService } from "../../lib/Axios";

interface ITodo {
    body: {
        time: string;
        task: string;
    }
}

const router = new Elysia().group("/todo", (app) =>
    app
        .post("/", async ({ body }: ITodo) => {
            const { time, task } = body;
            const { data } = await todoService.post("/todos", { time, task });
            return data;
        })
        .put("/", async ({ body }: ITodo) => {
            const { time, task } = body;
            const { data } = await todoService.put("/todos", { time, task });
            return data;
        })
        .delete("/", async ({ body }: ITodo) => {
            const { time } = body;
            const { data } = await todoService.delete(`/todos`);
            return data;
        })
);

export default router;
