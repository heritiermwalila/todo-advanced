import { TODO_API_HOST_ENDPOINT } from "src/config";
import { TodoItemType, TodoStatus } from "src/type";
import Api from "./Api";

class Todo extends Api {

    constructor(){
        super(TODO_API_HOST_ENDPOINT)
    }

    /**
     * 
     * @param name 
     * @returns 
     */
    async addTodo(todo: {name: string; status: TodoStatus}){
        try {
            return await this.request().post('todos', {...todo})
        } catch (error) {
            return error
        }
    }

    /**
     * Get All todos
     * @returns 
     */
    async getAllTodos(): Promise<TodoItemType[] | undefined> {
        try {
            return await this.request().get('todos')
        } catch (error) {
            return error
        }
    }

    /**
     * Update Todos
     * @param id 
     * @returns 
     */
    async updateTodo(id:number, todo: TodoItemType): Promise<TodoItemType | undefined> {
        try {
            return await this.request().patch(`todos/${id}`, todo)
        } catch (error) {
            return error
        }
    }

    /**
     * Delete Todo
     * @param id 
     * @returns 
     */
    async deleteTodo(id:number): Promise<any> {
        try {
            return await this.request().delete(`todos/${id}`, {})
        } catch (error) {
            return error
        }
    }

    async clearAllCompleted(): Promise<{success: boolean}> {
        try {
            return await this.request().post('todos/clear', {})
        } catch (error) {
            return error
        }
    }

}

export default Todo