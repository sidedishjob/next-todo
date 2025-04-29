import { createClient } from '@supabase/supabase-js';

// Supabase URLとAPIキー（環境変数から取得）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// クライアントインスタンス作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
