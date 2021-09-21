import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status-enuml';

@Entity('nest_tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({toPlainOnly: true})
  user: User;
}
