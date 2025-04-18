'use client';

import useTodos from '@/hooks/useTodos';
import TodoAppUI from '@/components/TodoAppUI';

// 状態を管理し、UI層に渡すだけのコンテナ
export default function TodoContainer() {
	const { todos, isLoading, add, updateTitle, toggleTodo, remove } = useTodos();

	return (
		<TodoAppUI
			todos={todos}
			isLoading={isLoading}
			add={add}
			updateTitle={updateTitle}
			toggleTodo={toggleTodo}
			remove={remove}
		/>
	);
}
