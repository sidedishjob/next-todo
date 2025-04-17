import { NextRequest, NextResponse } from 'next/server';
import { getTodos, addTodo, updateTodo, toggleTodo, deleteTodo } from '@/lib/mockData';

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

// タイトル更新
export async function PUT(req: NextRequest) {
	const { id, title } = await req.json();
	const status = updateTodo(id, title);
	return NextResponse.json({ success: status });
}

// 完了状態のトグル
export async function PATCH(req: NextRequest) {
	const { id } = await req.json();
	const status = toggleTodo(id);
	return NextResponse.json({ success: status });
}

// 削除
export async function DELETE(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = Number(searchParams.get('id'));

	if (!id) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	const status = deleteTodo(id);
	return new Response(null, { status: status ? 204 : 404 });
}
