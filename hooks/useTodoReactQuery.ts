'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/lib/apiRoutes';
import { Todo } from '@/types/todo';

const fetchTodos = async (): Promise<Todo[]> => {
	const res = await fetch(API_ROUTES.todos);
	if (!res.ok) throw new Error('Failed to fetch todos');
	return res.json();
};

export default function useTodosReactQuery() {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	});

	// 追加
	const add = useMutation({
		mutationFn: async (title: string) => {
			await fetch(API_ROUTES.todos, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title }),
			});
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// タイトル更新
	const updateTitle = useMutation({
		mutationFn: async ({ id, title }: { id: number; title: string }) => {
			await fetch(API_ROUTES.todos, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, title }),
			});
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// 完了状態のトグル
	const toggleTodo = useMutation({
		mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
			await fetch(API_ROUTES.todos, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, completed }),
			});
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// 削除
	const remove = useMutation({
		mutationFn: async (id: number) => {
			await fetch(`${API_ROUTES.todos}?id=${id}`, { method: 'DELETE' });
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	return {
		todos: data ?? [],
		isLoading,
		error,
		add: add.mutate,
		updateTitle: updateTitle.mutate,
		toggleTodo: toggleTodo.mutate,
		remove: remove.mutate,
	};
}
