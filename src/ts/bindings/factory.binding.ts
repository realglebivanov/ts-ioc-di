import { Binding } from './binding';
import { Container } from '@/container';
import { Class } from '@/class';

export type Factory<T> = (container: Container) => T;

export class FactoryBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Class<T>,
    private factory: Factory<T>
  ) { }

  public getClass(): Class<T> {
    return this.abstract;
  }

  public resolve(container: Container): T {
    return this.factory(container);
  }
}
