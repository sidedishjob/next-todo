import { NextRequest, NextResponse } from 'next/server';
import { Todo } from '@/types/todo';

let todos: Todo[] = [
	{
		id: 1,
		title: 'Learn Next.js API',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

export async function GET() {
	// 全てのTodoを返す
	return NextResponse.json(todos);
}

export async function POST(req: Request) {
	// リクエストボディからtitleを抽出
	const { title } = await req.json();
	if (!title || typeof title !== 'string') {
		return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
	}
	const newTodo: Todo = {
		id: Date.now(),
		title,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	todos.push(newTodo);
	return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(req: NextRequest) {
	const { id, title } = await req.json();
	todos = todos.map((t) => (t.id === id ? { ...t, title } : t));
	return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
	const { id } = await req.json();
	todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
	return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
	const { id } = await req.json();
	todos = todos.filter((t) => t.id !== id);
	return NextResponse.json({ success: true });
}
