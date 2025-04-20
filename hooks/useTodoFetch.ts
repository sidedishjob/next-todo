'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del } from '@/lib/api';
import { Todo } from '@/types/todo';

export default function useTodosFetch() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchTodos = async () => {
		try {
			setIsLoading(true);
			const data = await get<Todo[]>(API_ROUTES.todos);
			setTodos(data);
		} catch (err) {
			throw new Error('取得に失敗しました');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	// 追加
	const add = async (title: string) => {
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
	const remove = async (id: number) => {
		await del(`${API_ROUTES.todos}?id=${id}`);
		await fetchTodos();
	};

	return { todos, isLoading, error, add, updateTitle, toggleTodo, remove };
}
