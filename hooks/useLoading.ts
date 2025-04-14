'use client'

import { useState, useCallback } from 'react';

/**
 * 汎用的な読み込み状態を管理するカスタムフック
 */
export default function useLoading(initial: boolean = true) {
	const [isLoading, setIsLoading] = useState<boolean>(initial);

	const startLoading = useCallback(() => setIsLoading(true), []);
	const stopLoading = useCallback(() => setIsLoading(false), []);

	return {
		isLoading,
		startLoading,
		stopLoading,
	};
};
