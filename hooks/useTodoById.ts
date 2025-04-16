import useSWR from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';

export default function useTodoById(id: number) {
	const { data, error, isLoading } = useSWR<Todo>(id ? API_ROUTES.todoById(id) : null, fetcher);

	return {
		todo: data,
		isLoading,
		error,
	};
}
