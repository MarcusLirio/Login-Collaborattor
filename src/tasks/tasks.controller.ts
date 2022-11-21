import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/:id')
  getTaskById(@Param('id') id, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }
}
