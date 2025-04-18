'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { LoadingSpinner } from './TodoAnimations';
import { FiClipboard } from 'react-icons/fi';

export default function ApiTestClient() {
	const { data: todos, error, isLoading } = useSWR<Todo[]>('/api/todos', fetcher);
	const [newTitle, setNewTitle] = useState<string>('');

	// 新しいTodoを追加
	const addTodo = async () => {
		if (!newTitle) return;

		try {
			const res = await fetch(API_ROUTES.todos, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: newTitle }),
			});
			if (!res.ok) throw new Error('登録に失敗しました。');

			setNewTitle('');
			mutate(API_ROUTES.todos);
		} catch (err) {
			console.log('Todo追加エラー:', err);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo();
	};

	if (isLoading || !todos) return <LoadingSpinner />;
	if (error) return <p className="text-red-500">Error: {error.message}</p>;

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				🧪 API 動作確認ページ
			</h2>

			<form onSubmit={handleSubmit}>
				<div className="flex">
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder="新しいタスクを入力..."
						className="input flex-grow mr-2 transition-colors duration-300"
					/>
					<button type="submit" className="btn btn-primary" disabled={!newTitle.trim()}>
						追加
					</button>
				</div>
			</form>

			{todos.length === 0 ? (
				<div className="py-10 text-center text-gray-500">
					<FiClipboard className="mx-auto h-12 w-12 mb-3 text-gray-400" />
					<p className="text-lg">タスクがありません</p>
					<p className="text-sm">新しいタスクを追加しましょう</p>
				</div>
			) : (
				<ul className="text-gray-600 dark:text-gray-400 transition-colors duration-300 space-y-2">
					{todos?.map((todo) => (
						<li key={todo.id} className="border-b pb-2 rounded">
							<p className="font-semibold">{todo.title}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
