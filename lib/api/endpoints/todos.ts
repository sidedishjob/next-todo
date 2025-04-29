import { apiCaller } from '../core/apiCaller';
import { ApiClientType } from '../core/types';
import { API_ROUTES } from '../routes';
import { Todo } from '@/types/todo';

export const getTodos = async (client?: ApiClientType): Promise<Todo[]> => {
	const { data } = await apiCaller<Todo[]>('GET', API_ROUTES.todos, undefined, { client });
	return data;
};

export const createTodo = async (title: string, client?: ApiClientType): Promise<void> => {
	const { data } = await apiCaller<void>('POST', API_ROUTES.todos, { title }, { client });
	return data;
};

export const updateTodoTitle = async (
	id: string,
	title: string,
	client?: ApiClientType,
): Promise<void> => {
	const { data } = await apiCaller<void>('PUT', API_ROUTES.todoById(id), { title }, { client });
	return data;
};

export const toggleTodo = async (id: string, client?: ApiClientType): Promise<void> => {
	const { data } = await apiCaller<void>('PATCH', API_ROUTES.todoById(id), undefined, { client });
	return data;
};

export const deleteTodo = async (id: string, client?: ApiClientType): Promise<void> => {
	const { data } = await apiCaller<void>('DELETE', API_ROUTES.todoById(id), undefined, {
		client,
	});
	return data;
};
