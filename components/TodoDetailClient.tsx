'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import useTodoById from '@/hooks/useTodoById';
import { LoadingSpinner } from '@/components/TodoAnimations';

export default function TodoDetailClient() {
	const params = useParams();
	const id = Number(params?.id);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { todo, isLoading } = useTodoById(id, setErrorMessage);

	if (isLoading) return <LoadingSpinner />;
	if (errorMessage) return <p className="text-red-500">Error: {errorMessage}</p>;

	if (!todo) return <p className="text-gray-500">該当するTodoは存在しません。</p>;

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-3xl font-bold text-primary dark:text-blue-400 transition-colors duration-300">
				Todo詳細
			</h2>

			<div className="space-y-2">
				<p className="text-lg">
					<span className="font-semibold">タイトル：</span>
					{todo.title}
				</p>

				<p className="text-lg">
					<span className="font-semibold">ステータス：</span>
					<span
						className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${
							todo.completed
								? 'bg-green-100 text-green-700'
								: 'bg-gray-200 text-gray-600'
						}`}
					>
						{todo.completed ? '完了' : '未完了'}
					</span>
				</p>

				<p className="text-sm text-gray-500">
					作成日時：{new Date(todo.createdAt).toLocaleString()}
				</p>
				{todo.updatedAt && (
					<p className="text-sm text-gray-500">
						更新日時：{new Date(todo.updatedAt).toLocaleString()}
					</p>
				)}
			</div>
		</div>
	);
}
