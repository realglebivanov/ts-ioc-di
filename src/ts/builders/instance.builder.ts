import {
  ConstructorResolver,
  MethodResolver,
  Property,
  PropertyResolver
} from '@/dependencies';

import { Dictionary } from '@/dictionary';

export class InstanceBuilder<T extends Dictionary> {
  private product?: T;

  public constructor(
    private methodResolver: MethodResolver<T>,
    private propertyResolver: PropertyResolver<T>,
    private constructorResolver: ConstructorResolver<T>
  ) { }

  public setProduct(product: T): InstanceBuilder<T> {
    this.product = product;
    return this;
  }

  public getProduct(): T {
    return this.product as T;
  }

  public createInstance(extraCtorArgs: Array<any> = []): InstanceBuilder<T> {
    this.product = this.constructorResolver.resolveWith(extraCtorArgs);
    return this;
  }

  public injectProperties(): InstanceBuilder<T> {
    if (this.product === undefined) throw new Error('Cannot inject properties without class instance');
    this.propertyResolver.resolveAll((p: Property<any>) => (<T> this.product)[p.name] = p.value);
    return this;
  }

  public injectMethods(): InstanceBuilder<T> {
    this.methodResolver.resolveDependencies();
    return this;
  }
}
