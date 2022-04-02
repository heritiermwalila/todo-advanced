import React from 'react'
import { useApp } from 'src/context/App'
import { useTodo } from 'src/context/Todo';
import { TodoFilter } from 'src/type'
import './TodoFooter.scss'


interface TodoFooterProps {
    filter: TodoFilter;
    onChangeFilter?: (filter: TodoFilter) => void
}

const FILTERS: TodoFilter[] = ['All', 'Active', 'Completed']

export const TodoFooter = ({filter, onChangeFilter}: TodoFooterProps) => {
    
    const {mode} = useApp()
    const {todos, onClearCompleted} = useTodo()
    
    return <div className={`Todo-Footer-Container ${mode === 'dark' ? 'Todo-Footer-Dark' : ''}`}>
        <p className="Todo-Footer-Items">
                <span>{todos?.length} items left</span>
            </p>
        <ul>
            
            {
                FILTERS?.map(item => ( 
                <li 
                key={item} 
                className={`${filter === item && 'Todo-Footer-Active'}`}
                onClick={() => onChangeFilter?.(item)}
                >
                    <span>{item}</span>
                </li>))
            }

           
            
        </ul>
        <p className="Todo-Footer-Clear">
                <span className="Todo-Clear" onClick={() =>onClearCompleted?.()}>Clear Completed</span>
            </p>
    </div>
}