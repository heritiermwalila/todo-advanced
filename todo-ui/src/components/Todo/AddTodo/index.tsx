import React from 'react';
import { useTodo } from 'src/context/Todo';
import './AddTodo.scss'
export const AddTodo = () => {

    const [todo, setTodo] = React.useState<string>('')
    const {onAddTodo} = useTodo()



    const onSubmit = async (e:React.KeyboardEvent<HTMLInputElement>) => {
       if(e.code === 'Enter' || e.code === 'NumpadEnter'){
           if(todo){
                await onAddTodo?.(todo).then()
                setTodo('')
           }
       }
        
    }


    return <div className="Todo-Add">
        <div className="Todo-Checkbox"></div>
        <input 
            type="text" 
            placeholder="Create a new todo" 
            onChange={e => setTodo(e.target.value)}
            onKeyDown={onSubmit}
            value={todo}
            />
    </div>
}