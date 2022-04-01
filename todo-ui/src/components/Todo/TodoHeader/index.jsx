import { useApp } from 'src/context/App'
import { NightModeToggle } from '../../Global/NightModeToggle'
import { AddTodo } from '../AddTodo'
import './TodoHeader.scss'
export const TodoHeader = () => {
    const {mode} = useApp()
    return <div className={`Todo-Header-Container ${mode === 'dark' ? 'Todo-Header-Dark': ''}`}>
        <div className="Todo-Header-Content">
            <div className="Todo-Header-Top">
                <h1>Todo</h1>
                <NightModeToggle />
            </div>
            <AddTodo />
        </div>
    </div>
}