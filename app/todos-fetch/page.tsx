'use client';

import { useState } from 'react';
import useTodosFetch from '@/hooks/useTodoFetch';
import { LoadingSpinner } from '@/components/TodoAnimations';

export default function TodosFetchPage() {
	const { todos, isLoading, error, add, updateTitle, toggleTodo, remove } = useTodosFetch();

	const [newTitle, setNewTitle] = useState('');
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const handleAdd = () => {
		if (!newTitle.trim()) return;
		add(newTitle);
		setNewTitle('');
	};

	const handleEdit = (id: number, currentTitle: string) => {
		setEditingId(id);
		setEditTitle(currentTitle);
	};

	const handleUpdate = (id: number) => {
		if (!editTitle.trim()) return;
		updateTitle(id, editTitle);
		setEditingId(null);
		setEditTitle('');
	};

	if (isLoading) return <LoadingSpinner />;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				Todo List（fetch版）
			</h2>

			{/* 新規追加フォーム */}
			<div className="flex items-center space-x-2">
				<input
					type="text"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					placeholder="新しいタスクを追加"
					className="flex-grow p-2 border rounded"
				/>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					追加
				</button>
			</div>

			{/* Todoリスト */}
			<ul className="space-y-2">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between border-b pb-1 dark:text-gray-100"
					>
						<div className="flex items-center gap-2 w-full">
							<input
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodo(todo.id, !todo.completed)}
							/>
							{editingId === todo.id ? (
								<>
									<input
										type="text"
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
										className="flex-grow p-1 border rounded"
									/>
									<button
										onClick={() => handleUpdate(todo.id)}
										className="text-green-500 hover:underline"
									>
										保存
									</button>
									<button
										onClick={() => setEditingId(null)}
										className="text-gray-500 hover:underline"
									>
										キャンセル
									</button>
								</>
							) : (
								<>
									<span
										className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}
									>
										{todo.title}
									</span>
									<button
										onClick={() => handleEdit(todo.id, todo.title)}
										className="text-blue-500 hover:underline"
									>
										編集
									</button>
									<button
										onClick={() => remove(todo.id)}
										className="text-red-500 hover:underline"
									>
										削除
									</button>
								</>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
