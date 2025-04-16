import { NextRequest, NextResponse } from 'next/server';
import { getTodos } from '@/lib/mockData';

// 1件Todo取得
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const todo = getTodos().find((t) => t.id === Number(params.id));
	if (!todo) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
	}
	return NextResponse.json(todo);
}
