'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

export default function useTodosAxios() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchTodos = async () => {
		const res = await axios.get<Todo[]>(API_ROUTES.todos);
		setTodos(res.data);
	};

	useEffect(() => {
		fetchTodos()
			.catch((err) => setError(err))
			.finally(() => setIsLoading(false));
	}, []);

	// 追加
	const add = async (title: string) => {
		await axios.post(API_ROUTES.todos, { title });
		await fetchTodos();
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		await axios.put(API_ROUTES.todos, { id, title });
		await fetchTodos();
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number, completed: boolean) => {
		await axios.patch(API_ROUTES.todos, { id, completed });
		await fetchTodos();
	};

	// 削除
	const remove = async (id: number) => {
		await axios.delete(API_ROUTES.todos, { params: { id } });
		await fetchTodos();
	};

	return { todos, isLoading, error, add, updateTitle, toggleTodo, remove };
}
