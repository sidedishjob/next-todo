'use client';

import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/api/routes';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { createTodo, updateTodoTitle, toggleTodo as toggleTodoApi, deleteTodo } from '@/lib/api';

// Todo用のカスタムフック（状態管理 + 永続化）
export default function useTodos(setError?: (msg: string) => void) {
	const { data, error, isLoading } = useSWR<Todo[]>(API_ROUTES.todos, fetcher, {
		onError: (err) => handleApiError(err, setError),
	});

	const refresh = () => mutate(API_ROUTES.todos);

	// 追加
	const addTodo = async (title: string) => {
		try {
			await createTodo(title);
			refresh();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		try {
			await updateTodoTitle(id, title);
			refresh();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number) => {
		try {
			await toggleTodoApi(id);
			refresh();
		} catch (err) {
			handleApiError(err, setError);
		}
	};

	// 削除
	const removeTodo = async (id: number) => {
		try {
			await deleteTodo(id);
			refresh();
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
		refreshTodos: refresh,
	};
}
