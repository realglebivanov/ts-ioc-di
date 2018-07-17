import { Token } from '@/token';
import { AbstractClass } from '@/abstract.class';

export class Dependency<T> {
  public constructor(
    private token: Token<T>,
    private name?: string
  ) { }

  public getToken(): Token<T> {
    return this.token;
  }

  public getName(): string {
    return this.name || '';
  }

  public isInjectable(): boolean {
    return this.token instanceof Function ?
      Boolean((this.token as AbstractClass<T>).injectable) :
      Boolean(this.token);
  }
}
