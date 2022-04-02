import React from 'react';
import { useTodo } from 'src/context/Todo';
import { TodoItemType } from 'src/type';
import { TodoItem } from '../TodoItem';


interface TodoListProps {
    todos: TodoItemType[]
}
export const TodoList = ({todos = [], ...props}: TodoListProps) => {

    const leftItems = todos?.filter(t => ['Incomplete'].includes(t.status))
    const {onClearCompleted} = useTodo()

    const renderTodos = React.useCallback(() => {
        if(todos.length === 0){
            return <div className="Todo-Empty">
            <h4>No todo</h4>
        </div>
        }

        return todos.map((todo) => {
            return <TodoItem key={todo.id} {...{...todo, ...props}}/>
        })

    }, [todos])

    return <ul>
        {
            renderTodos()
        }
        <li className="Todo-Item Todo-Stats">
            <span>{leftItems?.length} items left</span>
            <span className="Todo-Clear" onClick={() => onClearCompleted?.()}>Clear Completed</span>
        </li>
    </ul>

}