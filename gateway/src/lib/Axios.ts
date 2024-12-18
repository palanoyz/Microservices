import axios from "axios";

const AuthService = "http://localhost:3001";
const GetTodolistService = "http://localhost:3002";
const TodolistService = "http://localhost:3003";

export const authService = axios.create({
    baseURL: AuthService,
});

export const getTodolistService = axios.create({
    baseURL: GetTodolistService,
});

export const todolistService = axios.create({
    baseURL: TodolistService,
});