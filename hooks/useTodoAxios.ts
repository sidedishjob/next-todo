'use client';

import { useEffect, useState } from 'react';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { Todo } from '@/types/todo';
import {
	getTodos,
	createTodo,
	updateTodoTitle,
	toggleTodo as toggleTodoApi,
	deleteTodo,
} from '@/lib/api';

export default function useTodosAxios(setError?: (msg: string) => void) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchTodos = async () => {
		try {
			const data = await getTodos('axios');
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
			await createTodo(title, 'axios');
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		try {
			await updateTodoTitle(id, title, 'axios');
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number, completed: boolean) => {
		try {
			await toggleTodoApi(id, completed, 'axios');
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 削除
	const removeTodo = async (id: number) => {
		try {
			await deleteTodo(id, 'axios');
			await fetchTodos();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	return { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo };
}
