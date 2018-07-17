import { Binding } from './binding';
import { Container } from '@/container';
import { Token } from '@/token';

export class SingletonBinding<T> implements Binding<T> {
  private resolved: T | null = null;

  public constructor(
    private binding: Binding<T>
  ) { }

  public getToken(): Token<T> {
    return this.binding.getToken();
  }

  public resolve(container: Container): T {
    return (this.resolved === null) ?
      this.resolved = this.binding.resolve(container) :
      this.resolved;
  }
}
