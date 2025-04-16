export const API_ROUTES = {
	todos: '/api/todos',
	todoById: (id: number) => `/api/todos/${id}`,
	settings: {
		theme: '/api/settings/theme',
	},
};
