export type ApiClientType = 'axios' | 'fetch';
export interface ApiResponse<T> {
	data: T;
	status: number;
}
