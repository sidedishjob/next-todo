'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

export default function useTodosAxios() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const res = await axios.get<Todo[]>(API_ROUTES.todos);
				setTodos(res.data);
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
