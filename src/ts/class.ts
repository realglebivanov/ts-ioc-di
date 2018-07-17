import { AbstractClass } from './abstract.class';

export interface Class<T> extends AbstractClass<T> {
  new(...args: Array<any>): T;
}

