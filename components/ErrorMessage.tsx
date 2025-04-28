import { ReactNode } from 'react';
import { FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
	'relative w-full flex items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				error: 'border-red-500/50 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/10',
				warning:
					'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/10',
				info: 'border-blue-500/50 text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/10',
			},
		},
		defaultVariants: {
			variant: 'error',
		},
	},
);

export interface ErrorMessageProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof alertVariants> {
	message?: string;
	children?: ReactNode;
}

/**
 * エラー表示用の共通コンポーネント
 * @param message エラーメッセージ文字列
 * @param children カスタムエラー内容
 * @param variant メッセージの種類 (error, warning, info)
 * @param className 追加のクラス名
 */
export function ErrorMessage({
	className,
	variant,
	message,
	children,
	...props
}: ErrorMessageProps) {
	const Icon =
		variant === 'warning' ? FiAlertTriangle : variant === 'info' ? FiInfo : FiAlertCircle;

	return (
		<div
			role="alert"
			className={cn(alertVariants({ variant }), 'animate-in fade-in-50', className)}
			{...props}
		>
			<Icon className="h-4 w-4" />
			<div>{message ?? children ?? 'エラーが発生しました'}</div>
		</div>
	);
}
