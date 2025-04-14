import TodoContainer from '@/containers/TodoContainer';

export const metadata = {
	title: 'ホーム',
	description: 'Todo App For Next は、React と Next.js を用いた学習用のTodo管理アプリです。',
};

export default function HomePage() {
	return <TodoContainer />;
}
