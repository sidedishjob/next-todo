import { Todo } from '@/types/todo';

// モック用のTodoデータ（本番ではDBに差し替え）
let todos: Todo[] = [
	{
		id: 1,
		title: 'Learn Next.js API',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 2,
		title: 'Write API Routes',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

export const getTodos = () => todos;

export const addTodo = (title: string) => {
	const newTodo: Todo = {
		id: Date.now(),
		title,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	todos.push(newTodo);
	return newTodo;
};
