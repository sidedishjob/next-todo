import { FiClipboard } from 'react-icons/fi';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

interface TodoListProps {
	todos: Todo[];
	updateTitle: (id: number, newTitle: string) => Promise<void>;
	toggleTodo: (id: number) => Promise<void>;
	remove: (id: number) => Promise<void>;
}

export default function TodoList({ todos, updateTitle, toggleTodo, remove }: TodoListProps) {
	if (todos.length === 0) {
		return (
			<div className="py-10 text-center text-gray-500">
				<FiClipboard className="mx-auto h-12 w-12 mb-3 text-gray-400" />
				<p className="text-lg">タスクがありません</p>
				<p className="text-sm">新しいタスクを追加しましょう</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					updateTitle={updateTitle}
					toggleTodo={toggleTodo}
					remove={remove}
				/>
			))}
		</div>
	);
}
