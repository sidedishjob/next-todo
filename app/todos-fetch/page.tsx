'use client';

import useTodosFetch from '@/hooks/useTodoFetch';
import { LoadingSpinner } from '@/components/TodoAnimations';

export default function TodosFetchPage() {
	const { todos, isLoading, error } = useTodosFetch();

	if (isLoading) return <LoadingSpinner />;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				Todo List (fetch版)
			</h2>
			<ul>{todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
		</div>
	);
}
