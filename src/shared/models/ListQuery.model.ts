type Order = 'DESC' | 'ASC';

export interface ListQuery {
  filter: { [key: string]: string };
  range: [number, number];
  sort: [string, Order];
}
