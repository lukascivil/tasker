// Models
import { ListQuery } from 'src/shared/pipes/models/ListQuery.model';
import { ParseListQueryPipe } from './list-query.pipe';

describe('QueryListPipe', () => {
  let validQueryList: ListQuery = {
    filter: {},
    range: [0, 9],
    sort: ['id', 'ASC'],
  };
  let invalidQueryList: any = {
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
      validQueryList,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });

  it('should return valid ListQuery with a invalid query', () => {
    const parseQueryListPipe = new ParseListQueryPipe();
    const transformedQueryList = parseQueryListPipe.transform(
      invalidQueryList,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });
});
