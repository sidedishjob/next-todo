'use client';

import { ReactNode, useEffect } from 'react';

interface ToastProps {
	message: string;
	onClose: () => void;
	duration?: number; // ms
}

export function Toast({ message, onClose, duration = 5000 }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [onclose, duration]);

	return (
		<div className="fixed top-16 right-3 bg-red-500 text-white px-4 py-3 rounded shadow-lg z-50">
			{message}
		</div>
	);
}
