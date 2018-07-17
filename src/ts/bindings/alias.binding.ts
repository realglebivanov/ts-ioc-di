import { Binding } from './binding';
import { Container } from '@/container';
import { Token } from '@/token';

export class AliasBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Token<T>,
    private concrete: Token<T>
  ) { }

  public getToken(): Token<T> {
    return this.abstract;
  }

  public resolve(container: Container): T {
    return container.resolve(this.concrete);
  }
}
