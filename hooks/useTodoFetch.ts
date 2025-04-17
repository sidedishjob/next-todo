'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

export default function useTodosFetch() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchTodos = async () => {
		const res = await fetch(API_ROUTES.todos);
		if (!res.ok) throw new Error('Failed to fetch todos');
		const data = await res.json();
		setTodos(data);
	};

	useEffect(() => {
		fetchTodos()
			.catch(setError)
			.finally(() => setIsLoading(false));
	}, []);

	// 追加
	const add = async (title: string) => {
		await fetch(API_ROUTES.todos, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title }),
		});
		await fetchTodos();
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		await fetch(API_ROUTES.todos, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, title }),
		});
		await fetchTodos();
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number, completed: boolean) => {
		await fetch(API_ROUTES.todos, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, completed }),
		});
		await fetchTodos();
	};

	// 削除
	const remove = async (id: number) => {
		await fetch(`${API_ROUTES.todos}?id=${id}`, {
			method: 'DELETE',
		});
		await fetchTodos();
	};

	return { todos, isLoading, error, add, updateTitle, toggleTodo, remove };
}
