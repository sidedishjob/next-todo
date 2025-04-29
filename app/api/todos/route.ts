import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET: Todo一覧取得
export async function GET() {
	const { data, error } = await supabase
		.from('todos')
		.select('*')
		.order('created_at', { ascending: true });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}

// POST: 新しいTodo追加
export async function POST(req: Request) {
	const { title } = await req.json();

	if (!title) {
		return NextResponse.json({ error: 'Title is required' }, { status: 400 });
	}

	const { error } = await supabase.from('todos').insert({ title, is_complete: false });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({}, { status: 201 });
}
