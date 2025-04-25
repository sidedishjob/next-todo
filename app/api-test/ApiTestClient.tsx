'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { LoadingSpinner } from '@/components/TodoAnimations';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/api/routes';
import { FiClipboard } from 'react-icons/fi';
import { handleApiError } from '@/lib/handlers/handleApiError';
import { createTodo } from '@/lib/api';

export default function ApiTestClient() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const {
		data: todos,
		error,
		isLoading,
	} = useSWR<Todo[]>('/api/todos', fetcher, {
		onError: (err) => handleApiError(err, setErrorMessage),
	});
	const [newTitle, setNewTitle] = useState<string>('');

	const addTodo = async (title: string) => {
		try {
			await createTodo(title);
			setNewTitle('');
			mutate(API_ROUTES.todos);
		} catch (err) {
			handleApiError(err, setErrorMessage);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo(newTitle);
	};

	if (isLoading || !todos) return <LoadingSpinner />;
	if (errorMessage) return <p className="text-red-500">Error: {errorMessage}</p>;

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
