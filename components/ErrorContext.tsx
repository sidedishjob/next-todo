'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type GlobalError = {
	message: string;
	timestamp: number;
} | null;

const ErrorContext = createContext<{
	error: GlobalError;
	setError: (message: string) => void;
	clearError: () => void;
}>({
	error: null,
	setError: () => {},
	clearError: () => {},
});

export function ErrorProvider({ children }: { children: ReactNode }) {
	const [error, setErrorState] = useState<GlobalError>(null);

	const setError = (message: string) => {
		setErrorState({ message, timestamp: Date.now() });
	};

	const clearError = () => {
		setErrorState(null);
	};

	return (
		<ErrorContext.Provider value={{ error, setError, clearError }}>
			{children}
		</ErrorContext.Provider>
	);
}

export function useGlobalError() {
	return useContext(ErrorContext);
}
