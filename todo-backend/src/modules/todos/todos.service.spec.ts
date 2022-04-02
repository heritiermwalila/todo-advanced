import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoStatus } from './todos.dto';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodoRepository = {
    create: jest.fn(payload => payload),
    save: jest.fn().mockImplementation(instance => Promise.resolve({
      id: Date.now(),
      ...instance
    })),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, {
        provide: getRepositoryToken(Todo),
        useValue: mockTodoRepository
      }],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a new todo', async () => {
    const todo = {
      name: 'My todo'
    }
    expect(await service.addTodo(todo)).toEqual({
      id: expect.any(Number),
      ...todo
    })
  })
});
