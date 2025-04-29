import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET: テーマ（light/dark）を取得
export async function GET() {
	// darkMode設定を取得
	const { data, error } = await supabase
		.from('settings')
		.select('value')
		.eq('key', 'darkMode')
		.single();

	if (error || !data) {
		return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
	}

	return NextResponse.json({ theme: data.value });
}

// PUT: テーマ更新
export async function PUT(req: NextRequest) {
	const { theme } = await req.json();

	if (theme !== 'light' && theme !== 'dark') {
		return NextResponse.json({ error: 'Invalid theme value' }, { status: 400 });
	}

	const { error } = await supabase
		.from('settings')
		.update({ value: theme })
		.eq('key', 'darkMode');

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}
