type Order = 'DESC' | 'ASC';

export interface QueryList {
  filter: { [key: string]: string };
  range: [number, number];
  sort: [string, Order];
}
