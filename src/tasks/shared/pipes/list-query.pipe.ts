import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// Models
import { ListQuery } from 'src/shared/pipes/models/ListQuery.model';

@Injectable()
export class ParseListQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const defaultQuery: ListQuery = {
      filter: {},
      range: [0, 9],
      sort: ['id', 'ASC'],
    };

    if (value.filter instanceof Object) {
      defaultQuery.filter = value.filter;
    }

    if (value.range instanceof Array && value.range.length === 2) {
      defaultQuery.range = value.range;
    }

    if (value.sort instanceof Array && value.range.length === 2) {
      defaultQuery.sort = value.sort;
    }

    return defaultQuery;
  }
}
