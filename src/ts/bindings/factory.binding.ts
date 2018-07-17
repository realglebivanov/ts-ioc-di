import { Binding } from './binding';
import { Container } from '@/container';
import { Token } from '@/token';

export type Factory<T> = (container: Container) => T;

export class FactoryBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Token<T>,
    private factory: Factory<T>
  ) { }

  public getToken(): Token<T> {
    return this.abstract;
  }

  public resolve(container: Container): T {
    return this.factory(container);
  }
}
