import { Binding } from './binding';
import { Class } from '@/class';
import { Container } from '@/container';
import { InstanceBuilder, InstanceBuilderFactory } from '@/builders';
import { Token } from '@/token';

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
    if (this.isAlias(container)) {
      return container.resolve(this.concrete);
    } else {
      return this.buildClassInstance(container);
    }
  }

  private isAlias(container: Container) {
    return this.abstract !== this.concrete && container.isBound(this.concrete);
  }

  private buildClassInstance(container: Container): T {
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
