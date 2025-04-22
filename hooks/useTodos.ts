'use client';

import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { post, put, patch, del } from '@/lib/api';
import { handleApiError } from '@/lib/handlers/handleApiError';

// Todo用のカスタムフック（状態管理 + 永続化）
export default function useTodos(setError?: (msg: string) => void) {
	const { data, error, isLoading } = useSWR<Todo[]>(API_ROUTES.todos, fetcher, {
		onError: (err) => handleApiError(err, setError),
	});

	// 追加
	const addTodo = async (title: string) => {
		try {
			await post(API_ROUTES.todos, { title });
			mutate(API_ROUTES.todos);
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		try {
			await put(API_ROUTES.todos, { id, title });
			mutate(API_ROUTES.todos);
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number) => {
		try {
			await patch(API_ROUTES.todos, { id });
			mutate(API_ROUTES.todos);
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 削除
	const removeTodo = async (id: number) => {
		try {
			await del(`${API_ROUTES.todos}?id=${id}`);
			mutate(API_ROUTES.todos);
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	return {
		todos: data ?? [],
		isLoading,
		error,
		addTodo,
		updateTitle,
		toggleTodo,
		removeTodo,
		refreshTodos: () => mutate(API_ROUTES.todos),
	};
}
