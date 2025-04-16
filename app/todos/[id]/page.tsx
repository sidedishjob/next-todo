import TodoDetailClient from '@/components/TodoDetailClient';

export const metadata = {
	title: 'Todo の詳細',
	description: '選択したタスクの詳細情報を表示します。タスクの確認や編集を行うことができます。',
};

export default function TodoDetailPage() {
	return <TodoDetailClient />;
}
