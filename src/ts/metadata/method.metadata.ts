import { Dependency, DependencyContainer, DependencyResolver } from '@/dependencies';

export class MethodMetadata<T> {
  private resolver?: DependencyResolver;

  public constructor(
    private name: string,
    private descriptor: PropertyDescriptor,
    private methodArguments: DependencyContainer<T>
  ) {
    this.decorateTargetMethod(this, descriptor.value);
  }

  public setResolver(resolver: DependencyResolver): void {
    this.resolver = resolver;
  }

  public getResolver(): DependencyResolver {
    return this.resolver as DependencyResolver;
  }

  public getDependencies(): Array<Dependency<any>> {
    return this.methodArguments.getMethodOrCtorDependencies(this.name);
  }

  private decorateTargetMethod(context: MethodMetadata<T>, originalMethod: Function): void {
    this.descriptor.value = function (...extraArgs: Array<any>) {
      return originalMethod.apply(this, context.getResolver().combineDepsWith(extraArgs));
    };
  }
}
