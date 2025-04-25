'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { Todo } from '@/types/todo';
import {
	createTodo,
	getTodos,
	updateTodoTitle,
	toggleTodo as toggleTodoApi,
	deleteTodo,
} from '@/lib/api';

export default function useTodosReactQuery(setError?: (msg: string) => void) {
	const queryClient = useQueryClient();

	// Todo一覧取得（GET）
	const { data, error, isLoading } = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: () => getTodos(),
	});

	// 追加（POST）
	const addTodo = useMutation({
		mutationFn: (title: string) => createTodo(title),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// タイトル更新（PUT）
	const updateTitle = useMutation({
		mutationFn: ({ id, title }: { id: number; title: string }) => updateTodoTitle(id, title),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// 完了状態のトグル（PATCH）
	const toggleTodo = useMutation({
		mutationFn: (id: number) => toggleTodoApi(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: (err) => handleApiError(err, setError),
	});

	// 削除（DELETE）
	const removeTodo = useMutation({
		mutationFn: (id: number) => deleteTodo(id),
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
