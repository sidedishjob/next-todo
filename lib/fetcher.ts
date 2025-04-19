import { get } from './api';

export const fetcher = <T>(url: string): Promise<T> => get<T>(url);
