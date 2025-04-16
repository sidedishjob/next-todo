import { Setting } from '@/types/setting';
import { Todo } from '@/types/todo';

// モック用のTodoデータ（本番ではDBに差し替え）
let todos: Todo[] = [
	{
		id: 1,
		title: 'Learn Next.js API',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 2,
		title: 'Write API Routes',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

let settings: Setting[] = [{ key: 'darkMode', value: 'light' }];

// -------------------- Todo関連 --------------------
// Todoを全件取得する
export const getTodos = () => todos;

// Todoをidで取得する
export const getTodoById = (id: number): Todo | undefined => todos.find((todo) => todo.id === id);

// Todoを追加する
export const addTodo = (title: string) => {
	const newTodo: Todo = {
		id: Date.now(),
		title,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	todos.push(newTodo);
	return newTodo;
};

// タイトルを更新する（DB専用）
export const updateTodo = (id: number, title: string): boolean => {
	const todo = todos.find((t) => t.id === id);
	if (!todo) return false;
	todo.title = title;
	return true;
};

// 完了状態をトグルする
export const toggleTodo = (id: number): boolean => {
	const todo = todos.find((t) => t.id === id);
	if (!todo) return false;
	todo.completed = !todo.completed;
	return true;
};

// Todoを削除する
export const deleteTodo = (id: number): boolean => {
	const index = todos.findIndex((t) => t.id === id);
	if (index === -1) return false;
	todos.splice(index, 1);
	return true;
};

// -------------------- 設定関連 --------------------
// 設定を全件取得する
export const getAllSettings = (): Setting[] => settings;
// 設定をkeyで取得する
export const getSetting = (key: string): Setting | undefined => settings.find((s) => s.key === key);

// 設定の値を更新する
export const updateSetting = (key: string, value: string): boolean => {
	const setting = settings.find((s) => s.key === key);
	if (setting) {
		setting.value = value;
		return true;
	}
	// 存在しない場合は新規追加（必要に応じて）
	settings.push({ key, value });
	return true;
};
