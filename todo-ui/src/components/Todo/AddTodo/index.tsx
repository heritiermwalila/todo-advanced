import React from 'react';
import { useTodo } from 'src/context/Todo';
import { TodoStatus } from 'src/type';
import './AddTodo.scss'
export const AddTodo = () => {

    const [todo, setTodo] = React.useState<string>('')
    const [error, setError] = React.useState<string>()
    const [isActive, setIsActive] = React.useState<TodoStatus>()
    const {onAddTodo} = useTodo()



    const onSubmit = async (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(!todo){
            return setError('Todo name is required')
        }
       if(e.code === 'Enter' || e.code === 'NumpadEnter'){
           if(todo && !isActive){
                await onAddTodo?.({name: todo}).then()
                setTodo('')
                setIsActive(undefined)
           }else {
            await onAddTodo?.({name: todo, status: 'Completed'}).then()
            setTodo('')
            setIsActive(undefined)
           }
       }
        
    }

    const toggleTodoState = () => {
        if(!isActive){
            setIsActive('Completed')
        }else {
            setIsActive(undefined)
        }
    }


    return <div className="Todo-Add">
        <div className={`Todo-Checkbox ${isActive === 'Completed' && 'Todo-Active'}`} onClick={() => toggleTodoState()}></div>
        <input 
            type="text" 
            placeholder="Create a new todo" 
            onChange={e => {
                setError(undefined)
                setTodo(e.target.value)
            }}
            onKeyDown={onSubmit}
            value={todo}
            />
        {error && <span className="Todo-Add-Error">{error}</span>}
    </div>
}