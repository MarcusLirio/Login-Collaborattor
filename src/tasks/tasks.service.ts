import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
//import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    console.log(createTaskDto);
    return this.taskRepository.CreateTask(createTaskDto, user);
  }
  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTaskStatus(id: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    await this.taskRepository.save(task);
    return task;
  }
  async getTasks(user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(user);
  }
}
