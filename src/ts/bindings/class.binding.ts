import { Binding } from './binding';
import { Class } from '@/class';
import { Container } from '@/container';
import { ClassBuilder, ClassBuilderFactory } from '@/builders';

export class ClassBinding<T> implements Binding<T> {
  public constructor(
    private abstract: Class<T>,
    private concrete: Class<T> = abstract,
    private extraCtorArgs: Array<any> = []
  ) { }

  public getClass(): Class<T> {
    return this.abstract;
  }

  public resolve(container: Container): T {
    return this.isAlias(container) ?
      container.resolve(this.concrete) :
      this.buildClassInstance(container);
  }

  private isAlias(container: Container) {
    return this.abstract !== this.concrete && container.isBound(this.concrete);
  }

  private buildClassInstance(container: Container): T {
    return this.getClassBuilder(container)
      .createInstance(this.extraCtorArgs)
      .injectProperties()
      .injectMethods()
      .getProduct();
  }

  private getClassBuilder(container: Container): ClassBuilder<T> {
    return ClassBuilderFactory.create(this.concrete, container);
  }
}
