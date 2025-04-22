'use client';

import { useState } from 'react';
import useTodos from '@/hooks/useTodos';
import TodoAppUI from '@/components/TodoAppUI';

// 状態を管理し、UI層に渡すだけのコンテナ
export default function TodoContainer() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo } =
		useTodos(setErrorMessage);

	return (
		<TodoAppUI
			todos={todos}
			isLoading={isLoading}
			errorMessage={errorMessage}
			addTodo={addTodo}
			updateTitle={updateTitle}
			toggleTodo={toggleTodo}
			removeTodo={removeTodo}
		/>
	);
}
