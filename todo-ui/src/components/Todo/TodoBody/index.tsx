import React from 'react';
import { useApp } from 'src/context/App';
import { useTodo } from 'src/context/Todo';
import { TodoFilter } from 'src/type';
import { TodoList } from '../TodoList';
import './TodoBody.scss';

// const TODOS: TodoItemType[] = [
//     {
//         id: 1,
//         name: 'First todo',
//         status: 'Completed',
//     },
//     {
//         id: 2,
//         name: 'Second todo',
//         status: 'Inactive',
//     },
//     {
//         id: 3,
//         name: 'Third todo',
//         status: 'Active',
//     },
//     {
//         id: 4,
//         name: 'Fourth todo',
//         status: 'Inactive',
//     },
//     {
//         id: 5,
//         name: 'Fith todo',
//         status: 'Inactive',
//     },
// ]


interface TodoBodyProps {
    filter: TodoFilter
}
export const TodoBody  = ({filter}:TodoBodyProps) => {
    const {mode} = useApp()
    const {todos, isRequesting} = useTodo()

    const filteredTodos = React.useMemo(() => {
        return todos?.filter(todo => {
            if(filter === 'Active'){
                return todo.status === 'Active'
            }else if(filter === 'Completed'){
                return todo.status === 'Completed'
            }
            return todo
        })
    }, [filter, todos, isRequesting]) ?? []
  
    return <div className={`Todo-Body-Container ${mode === 'dark' ? 'Todo-Body-Dark' : ''}`}>
        {
            isRequesting ? <span>Loading...</span> : <TodoList todos={filteredTodos}/>
        }
        
    </div>
}