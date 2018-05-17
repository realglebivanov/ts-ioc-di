export interface Class<T> {
  injectable?: boolean;

  new(...args: Array<any>): T;
}
