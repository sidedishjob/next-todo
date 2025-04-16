import { NextRequest, NextResponse } from 'next/server';
import { getSetting, updateSetting } from '@/lib/mockData';

// 現在のテーマ（light / dark）を取得する
export async function GET() {
	const setting = getSetting('darkMode');
	if (!setting) {
		return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
	}
	return NextResponse.json({ theme: setting.value });
}

// 設定の値を更新する
export async function POST(req: NextRequest) {
	const { theme } = await req.json();

	if (theme !== 'light' && theme !== 'dark') {
		return NextResponse.json({ error: 'Invalid theme value' }, { status: 400 });
	}

	const ok = updateSetting('darkMode', theme);

	return NextResponse.json({ success: ok });
}
