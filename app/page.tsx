import AppLayout from '@/layouts/AppLayout';
import TodoContainer from '@/containers/TodoContainer';

export default function HomePage() {
	return (
		<AppLayout>
			<TodoContainer />
		</AppLayout>
	);
}
