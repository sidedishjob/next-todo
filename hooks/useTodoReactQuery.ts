'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del } from '@/lib/api';
import { Todo } from '@/types/todo';

export default function useTodosReactQuery() {
	const queryClient = useQueryClient();

	// Todo一覧取得（GET）
	const { data, error, isLoading } = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: () => get<Todo[]>(API_ROUTES.todos),
	});

	// 追加（POST）
	const add = useMutation({
		mutationFn: (title: string) => post(API_ROUTES.todos, { title }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// タイトル更新（PUT）
	const updateTitle = useMutation({
		mutationFn: ({ id, title }: { id: number; title: string }) =>
			put(API_ROUTES.todos, { id, title }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// 完了状態のトグル（PATCH）
	const toggleTodo = useMutation({
		mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
			patch(API_ROUTES.todos, { id, completed }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});

	// 削除（DELETE）
	const remove = useMutation({
		mutationFn: (id: number) => del(`${API_ROUTES.todos}?id=${id}`),
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
