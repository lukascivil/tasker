import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    example: 10,
    description: 'Record Id'
  })
  id?: number;

  @ApiProperty({
    example: 'Working on a project',
    description: 'The Task description'
  })
  title: string;

  @ApiProperty({
    example: 'Working on a project',
    description: 'The Task description'
  })
  description: string;

  @ApiProperty({
    example: false,
    description: 'Task completed indicator'
  })
  completed: boolean;
}
