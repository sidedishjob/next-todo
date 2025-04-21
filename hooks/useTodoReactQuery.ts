'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del } from '@/lib/api';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { Todo } from '@/types/todo';

export default function useTodosReactQuery(setError?: (msg: string) => void) {
	const queryClient = useQueryClient();

	// Todo一覧取得（GET）
	const { data, error, isLoading } = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: () => get<Todo[]>(API_ROUTES.todos),
	});

	// 追加（POST）
	const addTodo = useMutation({
		mutationFn: (title: string) => post(API_ROUTES.todos, { title }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// タイトル更新（PUT）
	const updateTitle = useMutation({
		mutationFn: ({ id, title }: { id: number; title: string }) =>
			put(API_ROUTES.todos, { id, title }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// 完了状態のトグル（PATCH）
	const toggleTodo = useMutation({
		mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
			patch(API_ROUTES.todos, { id, completed }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// 削除（DELETE）
	const removeTodo = useMutation({
		mutationFn: (id: number) => del(`${API_ROUTES.todos}?id=${id}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	return {
		todos: data ?? [],
		isLoading,
		error,
		addTodo: addTodo.mutate,
		updateTitle: updateTitle.mutate,
		toggleTodo: toggleTodo.mutate,
		removeTodo: removeTodo.mutate,
	};
}
