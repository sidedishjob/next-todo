import axios from 'axios';

export const axiosClient = axios.create({
	baseURL: '.',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.response.use(
	(res) => res,
	(err) => {
		console.error('Axios Error:', err);
		return Promise.reject(err);
	},
);
