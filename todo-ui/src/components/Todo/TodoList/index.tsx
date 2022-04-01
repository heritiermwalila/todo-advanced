import React from 'react';
import { TodoItemType } from 'src/type';
import { TodoItem } from '../TodoItem';


interface TodoListProps {
    todos: TodoItemType[]
}
export const TodoList = ({todos = [], ...props}: TodoListProps) => {

    const leftItems = todos?.filter(t => ['Active', 'Inactive'].includes(t.status))

    return <ul>
        {
            todos.map((todo) => {
                return <TodoItem key={todo.id} {...{...todo, ...props}}/>
            })
        }
        <li className="Todo-Item Todo-Stats">
            <span>{leftItems?.length} items left</span>
            <span>Clear Completed</span>
        </li>
    </ul>

}