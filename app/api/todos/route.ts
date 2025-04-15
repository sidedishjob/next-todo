import { NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/lib/todoData';

export async function GET() {
	// 全てのTodoを返す
	return NextResponse.json(getTodos());
}

export async function POST(request: Request) {
	// リクエストボディからtitleを抽出
	const { title } = await request.json();

	if (!title || typeof title !== 'string') {
		return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
	}

	const newTodo = addTodo(title);

	return NextResponse.json(newTodo, { status: 201 });
}
