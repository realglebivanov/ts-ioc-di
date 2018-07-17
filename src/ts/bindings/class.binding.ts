import { Binding } from './binding';
import { Class } from '@/class';
import { Token } from '@/token';
import { Container } from '@/container';
import { InstanceBuilder, InstanceBuilderFactory } from '@/builders';

export class ClassBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Token<T>,
    private concrete: Class<T>,
    private extraCtorArgs: Array<any> = []
  ) { }

  public getToken(): Token<T> {
    return this.abstract;
  }

  public resolve(container: Container): T {
    return this.getInstanceBuilder(container)
      .createInstance(this.extraCtorArgs)
      .injectProperties()
      .injectMethods()
      .getProduct();
  }

  private getInstanceBuilder(container: Container): InstanceBuilder<T> {
    return InstanceBuilderFactory.create(this.concrete, container);
  }
}
