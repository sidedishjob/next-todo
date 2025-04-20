'use client';

import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { get, post, put, patch, del } from '@/lib/api';

// Todo用のカスタムフック（状態管理 + 永続化）
export default function useTodos() {
	const { data, error, isLoading } = useSWR<Todo[]>(API_ROUTES.todos, fetcher);

	// 追加
	const addTodo = async (title: string) => {
		await post(API_ROUTES.todos, { title });
		mutate(API_ROUTES.todos);
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		await put(API_ROUTES.todos, { id, title });
		mutate(API_ROUTES.todos);
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number) => {
		await patch(API_ROUTES.todos, { id });
		mutate(API_ROUTES.todos);
	};

	// 削除
	const removeTodo = async (id: number) => {
		await del(`${API_ROUTES.todos}?id=${id}`);
		mutate(API_ROUTES.todos);
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
