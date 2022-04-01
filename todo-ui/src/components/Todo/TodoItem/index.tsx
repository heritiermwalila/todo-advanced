import React from 'react';
import { useApp } from 'src/context/App';
import { useTodo } from 'src/context/Todo';
import { TodoStatus } from 'src/type';
import Cross from '../../../assets/images/icon-cross.svg';
import './TodoItem.scss';


interface TodoItemProps {
    id?: number;
    name: string;
    status: TodoStatus;
    onActiveTodo?: (id: number) => void;
    
}
export const TodoItem = ({id, name, status, onActiveTodo}: TodoItemProps) => {

    const {mode} = useApp()

    const {onDeleteTodo} = useTodo()
    

    React.useEffect(() => {
        console.log(id, name, status);
    }, [])


    return <li className={`Todo-Item ${mode === 'dark' ? 'Todo-Item-Dark': ''}`}>
        <div className="Todo-Item-Content">
            <div className={`Todo-Checkbox ${status === 'Active' ? 'Todo-Active' : ''}`} onClick={() => onActiveTodo?.(id!)}></div>
            <div className={status === 'Completed' ? 'Todo-Completed' : ''}>
                <h4>{name}</h4>
            </div>
        </div>
        <button onClick={() => onDeleteTodo?.(id!)}>
            <img src={Cross} alt="" />
        </button>
    </li>

}