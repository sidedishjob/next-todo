import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET: 1件Todo取得
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();
	console.log(data);

	if (error || !data) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
	}

	return NextResponse.json(data);
}

// PUT: タイトル更新
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { title } = await req.json();

	if (!title) {
		return NextResponse.json({ error: 'Title is required' }, { status: 400 });
	}

	const { error } = await supabase
		.from('todos')
		.update({ title, updated_at: new Date().toISOString() })
		.eq('id', id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({});
}

// PATCH: 完了状態のトグル
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	// 現在のis_complete取得
	const { data, error: fetchError } = await supabase
		.from('todos')
		.select('is_complete')
		.eq('id', id)
		.single();

	if (fetchError || !data) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
	}

	const { error: updateError } = await supabase
		.from('todos')
		.update({ is_complete: !data.is_complete, updated_at: new Date().toISOString() })
		.eq('id', id);

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 500 });
	}

	return NextResponse.json({});
}

// DELETE: Todo削除
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	const { error } = await supabase.from('todos').delete().eq('id', id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return new NextResponse(null, { status: 204 });
}
