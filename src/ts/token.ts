import { AbstractClass } from './abstract.class';

export type Token<T> = string | symbol | AbstractClass<T>;
