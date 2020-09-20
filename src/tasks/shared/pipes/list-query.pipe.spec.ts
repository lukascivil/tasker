// Models
import { ListQuery } from 'src/shared/pipes/models/ListQuery.model';
import { ParseListQueryPipe } from './list-query.pipe';

describe('ListQueryPipe', () => {
  const validListQuery: ListQuery = {
    filter: {},
    range: [0, 9],
    sort: ['id', 'ASC'],
  };
  const invalidListQuery: any = {
    filter: {},
    range: [9],
    sort: [],
  };

  it('should be defined', () => {
    expect(new ParseListQueryPipe()).toBeDefined();
  });

  it('should return valid ListQuery with a valid query', () => {
    const parseQueryListPipe = new ParseListQueryPipe();
    const transformedQueryList = parseQueryListPipe.transform(
      validListQuery,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });

  it('should return valid ListQuery with a invalid query', () => {
    const parseQueryListPipe = new ParseListQueryPipe();
    const transformedQueryList = parseQueryListPipe.transform(
      invalidListQuery,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });
});
