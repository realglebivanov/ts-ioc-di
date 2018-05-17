import { Class } from '@/class';
import { DependencyContainer } from '@/dependencies';

import { ConstructorMetadata } from './constructor.metadata';
import { PropertyMetadata } from './property.metadata';
import { MethodMetadata } from './method.metadata';

export class ClassMetadata<T> {
  private properties: Map<string, PropertyMetadata<T, any>> = new Map();
  private methods: Map<string, MethodMetadata<T>> = new Map();

  public constructor(
    private classConstructor: Class<T>,
    private constructorMetadata: ConstructorMetadata<T>,
    private dependencies: DependencyContainer<T>
  ) { }

  public getProperties(): Array<PropertyMetadata<T, any>> {
    return Array.from(this.properties.values());
  }

  public getMethods(): Array<MethodMetadata<T>> {
    return Array.from(this.methods.values());
  }

  public getConstructor(): ConstructorMetadata<T> {
    return this.constructorMetadata;
  }

  public addMethodParameter<D>(method: string, index: number, type: D): void {
    this.dependencies.addMethodOrCtorDependency(method, index, type);
  }

  public addProperty<D>(name: string, type: D): void {
    this.properties.set(name, new PropertyMetadata(name, this.classConstructor.prototype, type));
  }

  public addMethod(name: string, descriptor: PropertyDescriptor): void {
    this.methods.set(name, new MethodMetadata(name, descriptor, this.dependencies));
  }
}
