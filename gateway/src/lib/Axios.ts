import axios from "axios";

const AuthService = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const GetTodoService = process.env.GET_TODOLIST_SERVICE_URL || "http://localhost:3002";
const TodoService = process.env.TODOLIST_SERVICE_URL || "http://localhost:3003";

export const authService = axios.create({
    baseURL: AuthService,
});

export const getTodoService = axios.create({
    baseURL: GetTodoService,
});

export const todoService = axios.create({
    baseURL: TodoService,
});