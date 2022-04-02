import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodoDto, TodoStatus } from './todos.dto';

@Injectable()
export class TodosService {

    constructor(
        @InjectRepository(Todo)
        private todo: Repository<Todo>){}

    /**
     * ------------------------------------------------
     * Get all todos
     * ------------------------------------------------
     */
    getTodos(): Promise<TodoDto[]> {
        try {
         
            return this.todo.find({where: {status: In(['Incomplete', 'Completed'])}})
        } catch (error) {
            console.log(error);
            
        }
    }

    /**
     * ------------------------------------------------
     * Get a single todo by its id
     * ------------------------------------------------
     * @param id 
     */
    getTodo(id: number): Promise<TodoDto | null> {
        try {
            const todo = this.todo.findOne(id)

            if(!todo){
                return null
            }
    
            return todo
        } catch (error) {
            
        }
    }

    /**
     * ------------------------------------------------
     * Add new todo
     * ------------------------------------------------
     * @param todo
     * @returns {Todo}
     */
    addTodo(todo: TodoDto): Promise<Todo> {
        try {
            const newTodo = this.todo.create(todo)
            
            return this.todo.save(newTodo)
        } catch (error) {
            
        }
    }

    /**
     * Edit todo
     * @param id 
     * @param todo 
     */
    async updateTodo(id: number, todo: Todo): Promise<Todo>{
        try {
            const todoRecord = await this.todo.findOneOrFail(id)
            if(!todoRecord){
                return Promise.reject({message: `Failed to update todo ${id}`})
            }

            const {affected} = await this.todo.update(id, todo)

            
            
           if(affected > 0){
               return {
                   ...todo
               }
           }

           

        } catch (error) {
            return Promise.reject({message: `Failed to update todo ${id}`})
        }
    }

    /**
     * Delete todo
     * @param id 
     */
    async deleteTodo(id: number): Promise<{success: boolean}>{
        try {
            const {affected} = await this.todo.delete(id)
            if(affected > 0) {
                return {
                    success: true,
                }
            }
            return {
                success: false,
            }
        } catch (error) {
            //Send error message to the error reporting tool
            return {
                success: false,
            }
        }
    }

    /**
     * Clear all completed tasks
     */
    async clearAllCompleted(){
        try {
            const archiveTodos = await this.todo.update({status: TodoStatus.COMPLETED}, {status: TodoStatus.ARCHIVED})

            if(archiveTodos){
                return {
                    success: true
                }
            }

            return {
                success: false
            }
            
            
        } catch (error) {
            return {
                success: false
            }
        }
    }
}
