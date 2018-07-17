import { ClassMetadata } from './metadata';

export type AbstractClass<T> = Function & {
  injectable?: boolean;
  ___inject_metadata?: ClassMetadata<T>;
  prototype: T;
};

