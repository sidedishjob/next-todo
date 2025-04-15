'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';

export default function ApiTestPage() {
	// const [todos, setTodos] = useState<Todo[]>([]);
	const { data: todos, error, isLoading } = useSWR<Todo[]>('/api/todos', fetcher);
	const [newTitle, setNewTitle] = useState<string>('');

	// // APIからTodoを取得
	// const fetchTodos = async () => {
	// 	const res = await fetch('api/todos');
	// 	const data = await res.json();
	// 	setTodos(data);
	// };

	// 新しいTodoを追加
	const addTodo = async () => {
		if (!newTitle) return;
		await fetch('api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newTitle }),
		});
		setNewTitle('');
		// 登録した内容を再表示
		// await fetchTodos();
		mutate('/api/todos'); // SWRのキャッシュ更新+再取得
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo();
	};

	// useEffect(() => {
	// 	fetchTodos();
	// }, []);

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

			{isLoading && <p className="text-gray-500">読み込み中...</p>}
			{error && <p className="text-red-500">エラーが発生しました</p>}

			<ul className="text-gray-600 dark:text-gray-400 transition-colors duration-300 space-y-2">
				{todos?.map((todo) => (
					<li key={todo.id} className="border-b pb-2 rounded">
						<p className="font-semibold">{todo.title}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
