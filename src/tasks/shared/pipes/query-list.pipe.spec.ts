// Models
import { QueryList } from '../services/models/QueryList.model';
import { ParseQueryListPipe } from './query-list.pipe';

describe('QueryListPipe', () => {
  let validQueryList: QueryList = {
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
    expect(new ParseQueryListPipe()).toBeDefined();
  });

  it('should return valid QueryList with a valid query', () => {
    const parseQueryListPipe = new ParseQueryListPipe();
    const transformedQueryList = parseQueryListPipe.transform(
      validQueryList,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });

  it('should return valid QueryList with a invalid query', () => {
    const parseQueryListPipe = new ParseQueryListPipe();
    const transformedQueryList = parseQueryListPipe.transform(
      invalidQueryList,
      undefined,
    );

    expect(transformedQueryList.filter instanceof Object).toBeTruthy();
    expect(transformedQueryList.range.length).toEqual(2);
    expect(transformedQueryList.sort.length).toEqual(2);
  });
});
