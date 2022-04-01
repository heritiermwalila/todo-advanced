import React from 'react'
import { useApp } from 'src/context/App'
import { TodoFilter } from 'src/type'
import './TodoFooter.scss'


interface TodoFooterProps {
    filter: TodoFilter;
    onChangeFilter?: (filter: TodoFilter) => void
}

const FILTERS: TodoFilter[] = ['All', 'Active', 'Completed']

export const TodoFooter = ({filter, onChangeFilter}: TodoFooterProps) => {
    
    const {mode} = useApp()
    
    return <div className={`Todo-Footer-Container ${mode === 'dark' ? 'Todo-Footer-Dark' : ''}`}>
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
            {/* <li className="Todo-Footer-Active">
                <span>All</span>
            </li>
            <li>
                <span>Active</span>
            </li>
            <li>
                <span>Completed</span>
            </li> */}
        </ul>
    </div>
}