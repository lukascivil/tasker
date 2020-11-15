import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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
