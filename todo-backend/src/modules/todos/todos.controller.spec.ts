import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from './todo.entity';
import { TodosController } from './todos.controller';
import { TodoStatus } from './todos.dto';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodoService = {
    /**
     * Add todo
     */
    addTodo: jest.fn(payload => {
      return {
        id: Date.now(),
        ...payload,
      }
    }),
    /**
     * get todos
     */
    getTodos: jest.fn(() => {
      return [
        {
          id: Date.now(),
          name: 'My todo',
        }
      ]
    }),

    /**
     * Update todo
     */
    updateTodo: jest.fn((id: number, todo: Todo) =>{
      return {
        id,
        ...todo
      }
    }),

    /**
     * Delete todo
     */
     deleteTodo: jest.fn((id: number) => {
      return {
        success: true
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    }).overrideProvider(TodosService).useValue(mockTodoService).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a todo', async () => {
    const payload = {name: 'New todo'}
    expect(await controller.addTodo(payload)).toEqual({
      id: expect.any(Number),
      ...payload
    })

    expect(mockTodoService.addTodo).toHaveBeenCalled()
  })

  it('Should get Todos', async () => {
    const todos = await controller.getAll()
    expect(todos).toHaveLength(1)
    expect(mockTodoService.getTodos).toHaveBeenCalled()
  })

  it('Should update todo', async () => {
    const todo = {
      id: 1,
      name: 'My todo',
      status: TodoStatus.COMPLETED
    }

    const updatedTodo = await controller.editTodo(todo, '1')
    expect(updatedTodo).toEqual({
      ...todo
    })
    expect(mockTodoService.updateTodo).toHaveBeenCalled()

  })

  it('Should delete a todo', async () => {
    const todoId = '1'
    expect(await controller.deleteTodo(todoId)).toEqual({
      status: 'success'
    })

    expect(mockTodoService.deleteTodo).toHaveBeenCalled()
  })

  

});
