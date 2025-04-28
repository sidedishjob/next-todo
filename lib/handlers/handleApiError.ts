// import { ApiError } from '../api';
import { ApiError } from '../api/core/errors';

export const handleApiError = (error: unknown, setError?: (message: string) => void) => {
	if (error instanceof ApiError) {
		let message = '';
		switch (error.status) {
			case 400:
				message = '入力内容に誤りがあります';
				break;
			case 401:
				message = '認証が必要です';
				break;
			case 403:
				message = '操作の権限がありません';
				break;
			case 404:
				message = '対象が見つかりません';
				break;
			default:
				message = `エラーが発生しました: ${error.message}`;
		}
		setError?.(message);
	} else {
		console.error('未処理エラー:', error);
		setError?.('予期しないエラーが発生しました');
	}
};

/**
 * エラーオブジェクトをメッセージ文字列に整形するユーティリティ関数
 * @param error 受け取ったエラーオブジェクト
 * @returns 整形後のエラーメッセージ
 */
export function formatError(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	return '予期しないエラーが発生しました';
}
