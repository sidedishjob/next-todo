'use client';

import useTodos from '@/hooks/useTodos';
import TodoAppUI from '@/components/TodoAppUI';

// 状態を管理し、UI層に渡すだけのコンテナ
export default function TodoContainer() {
	const { todos, isLoading, addTodo, updateTitle, toggleTodo, removeTodo } = useTodos();

	return (
		<TodoAppUI
			todos={todos}
			isLoading={isLoading}
			addTodo={addTodo}
			updateTitle={updateTitle}
			toggleTodo={toggleTodo}
			removeTodo={removeTodo}
		/>
	);
}
