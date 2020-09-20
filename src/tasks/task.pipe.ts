import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TaskPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return 2;
  }
}
