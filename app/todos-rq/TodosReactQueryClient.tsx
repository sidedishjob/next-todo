'use client';

import { useState } from 'react';
import useTodosReactQuery from '@/hooks/useTodoReactQuery';
import { LoadingSpinner } from '@/components/TodoAnimations';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function TodosReactQueryClient() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo } =
		useTodosReactQuery(setErrorMessage);

	const [newTitle, setNewTitle] = useState('');
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const handleAdd = () => {
		if (!newTitle.trim()) return;
		addTodo(newTitle);
		setNewTitle('');
	};

	const handleEdit = (id: string, currentTitle: string) => {
		setEditingId(id);
		setEditTitle(currentTitle);
	};

	const handleUpdate = (id: string) => {
		if (!editTitle.trim()) return;
		updateTitle({ id, title: editTitle });
		setEditingId(null);
		setEditTitle('');
	};

	if (isLoading) return <LoadingSpinner />;
	if (errorMessage) return <ErrorMessage message={errorMessage} />;

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				Todo List（ReactQuery版）
			</h2>

			{/* 新規追加フォーム */}
			<div className="flex">
				<input
					type="text"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					placeholder="新しいタスクを追加"
					className="input flex-grow mr-2 transition-colors duration-300"
				/>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					disabled={!newTitle.trim()}
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
								checked={todo.is_complete}
								onChange={() => toggleTodo(todo.id)}
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
										className={`flex-grow ${todo.is_complete ? 'line-through text-gray-400' : ''}`}
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
										onClick={() => removeTodo(todo.id)}
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
