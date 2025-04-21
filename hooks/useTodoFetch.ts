'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del, ApiError } from '@/lib/api';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { Todo } from '@/types/todo';

export default function useTodosFetch(setError?: (msg: string) => void) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchTodos = async () => {
		try {
			setIsLoading(true);
			const data = await get<Todo[]>(API_ROUTES.todos);
			setTodos(data);
		} catch (err) {
			handleApiError(err, setError);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	// 追加
	const addTodo = async (title: string) => {
		try {
			await post(API_ROUTES.todos, { title });
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		try {
			await put(API_ROUTES.todos, { id, title });
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number, completed: boolean) => {
		try {
			await patch(API_ROUTES.todos, { id, completed });
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 削除
	const removeTodo = async (id: number) => {
		try {
			await del(`${API_ROUTES.todos}?id=${id}`);
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	return { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo };
}
