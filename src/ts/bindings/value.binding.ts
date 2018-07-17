import { Binding } from './binding';
import { Container } from '@/container';
import { Token } from '@/token';

export class ValueBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Token<T>,
    private value: T
  ) { }

  public getToken(): Token<T> {
    return this.abstract;
  }

  public resolve(_: Container): T {
    return this.value;
  }
}
