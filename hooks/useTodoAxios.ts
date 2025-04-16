'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

export default function useTodosAxios() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const res = await fetch(API_ROUTES.todos);
				if (!res.ok) throw new Error('Failed to fetch');
				const data = await res.json();
				setTodos(data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTodos();
	}, []);

	return { todos, isLoading, error };
}
