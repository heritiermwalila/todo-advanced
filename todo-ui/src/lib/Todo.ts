import { TODO_API_HOST_ENDPOINT } from "src/config";
import { TodoItemType } from "src/type";
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
    async addTodo(name:string){
        try {
            return await this.request().post('todos', {name})
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
            return await this.request().get(`todos/${id}`)
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
            return await this.request().delete(`todos/${id}`, null)
        } catch (error) {
            return error
        }
    }

    async clearAllCompleted(): Promise<number[]> {
        try {
            return await this.request().post('todos/clear-completed', null)
        } catch (error) {
            return error
        }
    }

}

export default Todo