import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status-enuml';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async CreateTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    console.log(task);
    return task;
  }
  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.description) LIKE :search OR LOWER(task.title) LIKE :search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
