import { NextRequest, NextResponse } from 'next/server';
import { getTodos, updateTodo, toggleTodo, deleteTodo } from '@/lib/mockData';

// 1件Todo取得
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const todo = getTodos().find((t) => t.id === Number(params.id));
	if (!todo) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
	}
	return NextResponse.json(todo);
}

// タイトル更新
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { title } = await req.json();
	const status = updateTodo(Number(params.id), title);
	return NextResponse.json({ success: status });
}

// 完了状態のトグル
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const status = toggleTodo(Number(params.id));
	return NextResponse.json({ success: status });
}

// 削除
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = Number(params.id);

	if (!id) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	const status = deleteTodo(id);
	return new Response(null, { status: status ? 204 : 404 });
}
