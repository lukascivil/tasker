import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 10,
    description: 'Record Id'
  })
  id?: number;

  @Column({ default: '' })
  @ApiProperty({
    example: 'Working on a project',
    description: 'The Task description'
  })
  description: string;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'Task completed indicator'
  })
  completed: boolean;
}
