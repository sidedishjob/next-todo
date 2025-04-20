'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del, ApiError } from '@/lib/api';
import { Todo } from '@/types/todo';

export default function useTodosFetch() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTodos = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await get<Todo[]>(API_ROUTES.todos);
			setTodos(data);
		} catch (err) {
			if (err instanceof ApiError) {
				setError(`取得エラー: ${err.message} (status: ${err.status})`);
			} else {
				console.error('想定外エラー:', err);
				setError('Todoの取得に失敗しました。');
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	// 追加
	const addTodo = async (title: string) => {
		await post(API_ROUTES.todos, { title });
		await fetchTodos();
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		await put(API_ROUTES.todos, { id, title });
		await fetchTodos();
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number, completed: boolean) => {
		await patch(API_ROUTES.todos, { id, completed });
		await fetchTodos();
	};

	// 削除
	const removeTodo = async (id: number) => {
		await del(`${API_ROUTES.todos}?id=${id}`);
		await fetchTodos();
	};

	return { todos, isLoading, error, addTodo, updateTitle, toggleTodo, removeTodo };
}
