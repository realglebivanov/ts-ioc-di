import { ClassMetadata } from './metadata';

export interface AbstractClass<T> {
  injectable?: boolean;
  ___inject_metadata?: ClassMetadata<T>;
  name: string;
  prototype: T;
}

