import { Dependency, DependencyContainer } from '@/dependencies';

export class ConstructorMetadata<T> {
  public constructor(
    private methodArguments: DependencyContainer<T>
  ) { }

  public getDependencies(): Array<Dependency<any>> {
    return this.methodArguments.getMethodOrCtorDependencies();
  }
}
