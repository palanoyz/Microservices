import axios from "axios";

const AuthService = "http://localhost:3001";
const GetTodoService = "http://localhost:3002";
const TodoService = "http://localhost:3003";

export const authService = axios.create({
    baseURL: AuthService,
});

export const getTodoService = axios.create({
    baseURL: GetTodoService,
});

export const todoService = axios.create({
    baseURL: TodoService,
});