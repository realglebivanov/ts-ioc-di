import { ClassMetadata } from './metadata';

export interface Class<T> {
  injectable?: boolean;
  ___inject_metadata?: ClassMetadata<T>;
  prototype: T;
  new(...args: Array<any>): T;
}

