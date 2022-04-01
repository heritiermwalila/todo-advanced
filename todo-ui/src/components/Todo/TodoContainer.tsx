import React from 'react';
import TodoProvider from 'src/context/Todo';
import { TodoFilter } from 'src/type';
import { TodoBody } from './TodoBody'
import './TodoContainer.scss'
import { TodoFooter } from './TodoFooter'
import { TodoHeader } from './TodoHeader'

const TodoContainer = () => {
    const [filter, setFilter] = React.useState<TodoFilter>('All')


    const onChangeFilter = (nextFilter: TodoFilter) => {
        setFilter(nextFilter)
    }

    return <div className="Todo-Container">
        <TodoProvider>
            <TodoHeader />
            <TodoBody {...{filter}}/>
        </TodoProvider>
        <TodoFooter {...{filter, onChangeFilter}}/>

        <div className="text__center text-gray">
            <p>Drag and drop to reorder list</p>
        </div>
    </div>
}

export default TodoContainer