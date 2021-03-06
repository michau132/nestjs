import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto)
    }
    return this.tasksService.getAllTasks();
  }

  

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string) {
    return this.tasksService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id, @Body() status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

}
