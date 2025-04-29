'use client';

import { useEffect, useState } from 'react';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { Todo } from '@/types/todo';
import {
	createTodo,
	getTodos,
	updateTodoTitle,
	toggleTodo as toggleTodoApi,
	deleteTodo,
} from '@/lib/api';

export default function useTodosFetch(setError?: (msg: string) => void) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchTodos = async () => {
		try {
			const data = await getTodos();
			setTodos(data);
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchTodos();
		setIsLoading(false);
	}, []);

	// 追加
	const addTodo = async (title: string) => {
		try {
			await createTodo(title);
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// タイトル更新
	const updateTitle = async (id: string, title: string) => {
		try {
			await updateTodoTitle(id, title);
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 完了状態のトグル
	const toggleTodo = async (id: string) => {
		try {
			// await patch(API_ROUTES.todos, { id, completed });
			await toggleTodoApi(id);
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 削除
	const removeTodo = async (id: string) => {
		try {
			await deleteTodo(id);
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	return { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo };
}
