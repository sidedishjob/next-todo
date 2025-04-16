'use client';

import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

const fetchTodos = async (): Promise<Todo[]> => {
	const res = await fetch(API_ROUTES.todos);
	if (!res.ok) throw new Error('Failed to fetch todos');
	return res.json();
};

export default function useTodosReactQuery() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	return { todos: data ?? [], isLoading, error };
}
