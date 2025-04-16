'use client';

import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';

// Todo用のカスタムフック（状態管理 + 永続化）
export default function useTodos() {
	const { data, error, isLoading } = useSWR<Todo[]>(API_ROUTES.todos, fetcher);

	// 追加
	const add = async (title: string) => {
		await fetch(API_ROUTES.todos, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title }),
		});
		mutate(API_ROUTES.todos);
	};

	// タイトル更新
	const updateTitle = async (id: number, title: string) => {
		await fetch(API_ROUTES.todos, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, title }),
		});
		mutate(API_ROUTES.todos);
	};

	// 完了状態のトグル
	const toggleTodo = async (id: number) => {
		await fetch(API_ROUTES.todos, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		mutate(API_ROUTES.todos);
	};

	// 削除
	const remove = async (id: number) => {
		await fetch(API_ROUTES.todos, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		mutate(API_ROUTES.todos);
	};

	return {
		todos: data ?? [],
		isLoading,
		error,
		add,
		updateTitle,
		toggleTodo,
		remove,
		refreshTodos: () => mutate(API_ROUTES.todos),
	};
}
