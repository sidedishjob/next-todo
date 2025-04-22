import useSWR from 'swr';
import { Todo } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { handleApiError } from '@/lib/handlers/handleApiError';

export default function useTodoById(id: number, setError?: (msg: string) => void) {
	const { data, error, isLoading } = useSWR<Todo>(id ? API_ROUTES.todoById(id) : null, fetcher, {
		onError: (err) => handleApiError(err, setError),
	});

	return {
		todo: data,
		isLoading,
		error,
	};
}
