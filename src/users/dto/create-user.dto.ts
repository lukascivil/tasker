import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Luiz cafeina pura',
    description: 'User name'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'cafe@gmail.com',
    description: 'User email'
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456789',
    description: 'User password'
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 28,
    description: 'User age'
  })
  @IsDateString()
  birthdate: string;
}
