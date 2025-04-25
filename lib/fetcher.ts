import { apiCaller } from './api/core/apiCaller';

export const fetcher = <T>(url: string): Promise<T> => apiCaller<T>('GET', url);
