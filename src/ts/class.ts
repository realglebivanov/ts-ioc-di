export interface Class<T> {
  [key: string]: any;

  injectable?: boolean;

  new(...args: Array<any>): T;
}
