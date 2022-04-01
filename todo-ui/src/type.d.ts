export type TodoStatus = 'Active' | 'Inactive' | 'Completed';

export type TodoItemType = {
    name: string;
    status: TodoStatus
    id?: number
}

export type ThemeMode = 'light' | 'dark'

export type TodoFilter = 'All' | 'Active' | 'Completed'

export interface IAppContext {
    mode: ThemeMode
    onChangeMode?: () => void;
}

export interface ITodoContext {
    todos?: TodoItemType[];
    error?: string | null;
    isLoading?: boolean;
    isRequesting?: boolean;
    onAddTodo?: (name: string) => Promise<void>;
    onGetTodos?: () => void;
    onGetTodo?: (id: number) => void;
    onDeleteTodo?: (id: number) => Promise<void>
    onUpdateTodo?: (todo: TodoItemType) => void;
    onClearCompleted?: () => void
}