/** @format */

import "server-only";
import { deleteManyTodos, deleteTodo } from "./delete-todo-dal";
import { getTodo, getTodos } from "./get-todo-dal";
import { createTodo } from "./post-todo-dal";
import { updateTodo } from "./update-todo-dal";

const todoDAL = {
  all: getTodos,
  find: getTodo,
  create: createTodo,
  update: updateTodo,
  delete: deleteTodo,
  deleteMany: deleteManyTodos,
};

export default todoDAL;
