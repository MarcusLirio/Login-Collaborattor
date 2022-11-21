import { NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async CreateTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { balance } = createTaskDto;
    const task = this.create({
      balance,
      user,
    });
    await this.save(task);
    console.log(task);
    return task;
  }
  async getTasks(user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

    const tasks = await query.getMany();
    return tasks;
  }
}
