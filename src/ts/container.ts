import { Class } from './class';
import { Memento } from './memento';
import { autowiredBuilder } from '@/decorators';

import {
  Binding,
  ClassBinding,
  Factory,
  FactoryBinding,
  SingletonBinding,
  ValueBinding
} from './bindings';

export class Container {
  private bindings: Map<Class<any>, Binding<any>> = new Map();

  public constructor() {
    autowiredBuilder.setDefaultContainer(this);
  }

  public unbindAll(): void {
    this.bindings.clear();
  }

  public unbind<T>(abstract: Class<T>): void {
    this.bindings.delete(abstract);
  }

  public isBound<T>(abstract: Class<T>): boolean {
    return this.bindings.has(abstract);
  }

  public save(): Memento {
    return new Memento(new Map(this.bindings));
  }

  public restore(memento: Memento): void {
    this.bindings = new Map(memento.getState());
  }

  public resolve<T>(abstract: Class<T>): T {
    let foundBinding = this.bindings.get(abstract);
    foundBinding = foundBinding || new ClassBinding(abstract);
    return foundBinding.resolve(this);
  }

  public instance<T, D extends T>(abstract: Class<T>, instance: D): void {
    this.register(new ValueBinding(abstract, instance));
  }

  public singleton<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void {
    this.register(new SingletonBinding(new ClassBinding(abstract, concrete, args)));
  }

  public singletonFactory<T, D extends T>(abstract: Class<T>, factory: Factory<D>): void {
    this.register(new SingletonBinding(new FactoryBinding(abstract, factory)));
  }

  public bind<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void {
    this.register(new ClassBinding(abstract, concrete, args));
  }

  public bindFactory<T, D extends T>(abstract: Class<T>, factory: Factory<D>): void {
    this.register(new FactoryBinding(abstract, factory));
  }

  private register<T>(binding: Binding<T>): void {
    this.bindings.set(binding.getClass(), binding);
  }
}
