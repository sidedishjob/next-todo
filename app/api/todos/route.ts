import { NextRequest, NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/lib/mockData';

// 全件取得
export async function GET() {
	return NextResponse.json(getTodos());
}

// 追加
export async function POST(req: Request) {
	// リクエストボディからtitleを抽出
	const { title } = await req.json();
	if (!title || typeof title !== 'string') {
		return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
	}
	const newTodo = addTodo(title);
	return NextResponse.json(newTodo, { status: 201 });
}
