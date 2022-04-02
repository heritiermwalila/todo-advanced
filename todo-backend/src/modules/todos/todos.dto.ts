import {IsNotEmpty, IsEnum, IsNumberString, IsEmpty, IsOptional} from 'class-validator'


export enum TodoStatus {
    INCOMPLETE = 'Incomplete',
    COMPLETED = 'Completed',
    ARCHIVED = 'Archived',
}
export class TodoDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEnum(TodoStatus)
    status?: TodoStatus
}

export class FindOneParams {
    @IsNumberString()
    id: number;
  }
  

export type ResponseDto = {
    status: 'error' | 'success',
    message?: string
}

