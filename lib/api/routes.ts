export const API_ROUTES = {
	todos: '/api/todos',
	todoById: (id: string) => `/api/todos/${id}`,
	settings: {
		theme: '/api/settings/theme',
	},
};
