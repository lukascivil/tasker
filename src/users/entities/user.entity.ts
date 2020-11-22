// Packages
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Entity
import { AppEntity } from 'src/shared/models/app-entity.model';

const entityName: AppEntity = 'user';

@Entity(entityName)
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 10,
    description: 'Record Id'
  })
  id?: number;

  @Column({ type: 'longtext', default: '' })
  @ApiProperty({
    example: 'Working on a project with react-admin and nestjs',
    description: 'The Task description'
  })
  name: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  @ApiProperty({
    example: 28,
    description: 'User age'
  })
  birthdate: string;

  @Column({ type: 'varchar', unique: true, length: 256, nullable: false })
  @ApiProperty({
    example: 'cafe@gmail.com',
    description: 'User email'
  })
  email: string;

  @Column({ type: 'text', default: '' })
  @ApiProperty({
    example: '123456',
    description: 'User password'
  })
  password: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  @ApiProperty({
    example: 'YYYY-MM-DD HH-MM-SS',
    description: 'when this user was created'
  })
  created_at: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  @ApiProperty({
    example: 'YYYY-MM-DD HH-MM-SS',
    description: 'when this user was updated'
  })
  updated_at: string;
}
