import React from 'react';
import Todo from 'src/lib/Todo';
import { ITodoContext, TodoItemType } from 'src/type';

const TodoService = new Todo()

export const TodoContext = React.createContext<ITodoContext>({})

/**
 * Todo context hook
 * @returns 
 */
export const useTodo = () => React.useContext(TodoContext)

interface TodoProviderProps {
    children: React.ReactNode
}

/**
 * Todo Provider
 * @param param0 
 * @returns 
 */
export default function TodoProvider({children}: TodoProviderProps){

    const [todos, setTodos] = React.useState<TodoItemType[]>([])
    const [isRequesting, setIsRequesting] = React.useState(false)
    const [error, setError] = React.useState<string | null | undefined>()


    React.useEffect(() => {
        onGetTodos()
    }, [])

    React.useEffect(() => {
        console.log(todos);
        
    }, [todos])

    const onAddTodo = async (name: string) => {
        try {
        
            const todo = await TodoService.addTodo(name)
            if(todo){
                onGetTodos()
            }
        } catch (error) {
            setError(error?.message)
        }
    }

    const onGetTodos = async () => {
        try {
            setError(null)
            setIsRequesting(true)
            const getTodos = await TodoService.getAllTodos()
            if(getTodos){
                setTodos(getTodos)
                setIsRequesting(false)
            }
        } catch (error) {
            setError(error?.message)
            setIsRequesting(false)
        }
    }


    const onUpdateTodo = async (todo: TodoItemType) => {
        try {
            setError(null)
            setIsRequesting(true)
            const req = await TodoService.updateTodo(todo.id!, todo)
            if(req){
                const all = todos.filter(t => t.id !== todo.id)
                all.push(req)
                setTodos(all)
                setIsRequesting(false)
            }
        } catch (error) {
            setError(error?.message)
            setIsRequesting(false)
        }
    }

    const onClearCompleted = async () => {
        try {
            const clearAllCompleted = await TodoService.clearAllCompleted()

            if(clearAllCompleted?.length > 0){
                const allTodos = todos.slice()?.filter(t => !clearAllCompleted.includes(t.id!))
                setTodos(allTodos)
                setIsRequesting(false)
            }

        } catch (error) {
            setError(error?.message)
            setIsRequesting(false)
        }
    }

    const onDeleteTodo = async (id: number) => {
        try {
            const deleteTodo = await TodoService.deleteTodo(id)
            if(deleteTodo){
                onGetTodos()
            }
        } catch (error) {
            
        }
    }


    const value = React.useMemo(() => ({
        todos,
        error,
        onAddTodo,
        onGetTodos,
        onUpdateTodo,
        onDeleteTodo,
        onClearCompleted,
        isRequesting
    }), [todos, isRequesting])


    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>

}