import { axiosClient } from './axios';
import { fetchClient } from './fetch';

// TODO: fetchClient導入予定
export const apiClient = axiosClient;
export const apiFetch = fetchClient;
