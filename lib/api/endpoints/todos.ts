import { apiCaller } from '../core/apiCaller';
import { API_ROUTES } from '../routes';
import { Todo } from '@/types/todo';

type ClientType = 'axios' | 'fetch';

export const getTodos = async (client?: ClientType): Promise<Todo[]> => {
	return await apiCaller<Todo[]>('GET', API_ROUTES.todos, undefined, { client });
};

export const createTodo = async (title: string, client?: ClientType): Promise<void> => {
	return await apiCaller<void>('POST', API_ROUTES.todos, { title }, { client });
};

export const updateTodoTitle = async (
	id: number,
	title: string,
	client?: ClientType,
): Promise<void> => {
	return await apiCaller<void>('PUT', API_ROUTES.todoById(id), { title }, { client });
};

export const toggleTodo = async (id: number, client?: ClientType): Promise<void> => {
	return await apiCaller<void>('PATCH', API_ROUTES.todoById(id), undefined, { client });
};

export const deleteTodo = async (id: number, client?: ClientType): Promise<void> => {
	return await apiCaller<void>('DELETE', API_ROUTES.todoById(id), undefined, { client });
};
