import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { FindOneParams, ResponseDto, TodoDto } from './todos.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService){}

    @Get()
    async getAll(): Promise<TodoDto[] | ResponseDto>{
        try {
            const todos = await this.todoService.getTodos()
            return todos
        } catch (error) {
            return {
                status: 'error',
                message: 'Something went wrong'
            }
        }
    }

    @Post()
    async addTodo(@Body() payload: TodoDto): Promise<TodoDto | ResponseDto>{
        try {
            const todo = await this.todoService.addTodo(payload)
            return todo
        } catch (error) {
            return {
                status: 'error',
                message: error?.message ?? 'Something went wrong'
            }
        }
    }


    @Get('/:id')
    async getSingleTodo(@Param() params: FindOneParams): Promise<TodoDto | ResponseDto>{
        try {
           
            
            const todo = await this.todoService.getTodo(+params?.id)
           
            return todo
        } catch (error) {
            return {
                status: 'error',
                message: error?.message ?? 'Something went wrong'
            }
        }
    }

    


    @Patch('/:id')
    async editTodo(@Body() payload: Partial<Todo>, @Param('id') id: string): Promise<any | ResponseDto>{
        try {
            const {name, status} = payload
            const updatedTodo = await this.todoService.updateTodo(+id, {id: +id, name, status})
            return updatedTodo
        } catch (error) {
            return {
                status: 'error',
                message: error?.message ?? 'Something went wrong'
            }
        }
    }

    @Delete('/:id')
    async deleteTodo(@Param('id') id: string): Promise<ResponseDto> {
        try {
           
            const {success} = await this.todoService.deleteTodo(+id)
            if(success){
                return {
                    status: 'success',
                }
            }
        } catch (error) {
            return {
                status: 'error',
                message: error?.message ?? 'Something went wrong'
            }
        }
    }

    @Post('/clear')
    async clearAllCompleted(){
        try {
            const clearedTodos = await this.todoService.clearAllCompleted()
            return clearedTodos
        } catch (error) {
            return {
                status: 'error',
                message: error?.message ?? 'Something went wrong'
            }
            
        }
    }
}
