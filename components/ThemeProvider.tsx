'use client';

import { useEffect } from 'react';
import useDarkMode from '@/hooks/useDarkMode';

interface ThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	useDarkMode();

	return <>{children}</>;
}
