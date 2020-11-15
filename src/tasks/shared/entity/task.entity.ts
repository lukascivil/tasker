// Packages
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Models
import { AppResource } from 'src/shared/models/app-resource.model';

const entityName: AppResource = 'task';

@Entity(entityName)
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
