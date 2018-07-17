import { Class } from './class';
import { Token } from './token';
import { Memento } from './memento';
import { UnknownDependencyError } from './errors';

import {
  Binding,
  ClassBinding,
  AliasBinding,
  Factory,
  FactoryBinding,
  SingletonBinding,
  ValueBinding
} from './bindings';

export type State = Map<Token<any>, Binding<any>>;

export class Container {
  private bindings: State = new Map();

  public unbindAll(): void {
    this.bindings.clear();
  }

  public unbind<T>(abstract: Token<T>): void {
    this.bindings.delete(abstract);
  }

  public isBound<T>(abstract: Token<T>): boolean {
    return this.bindings.has(abstract);
  }

  public save(): Memento {
    return new Memento(new Map(this.bindings));
  }

  public restore(memento: Memento): void {
    this.bindings = new Map(memento.getState());
  }

  public resolve<T>(abstract: Token<T>): T {
    const foundBinding = this.bindings.get(abstract);
    if (foundBinding !== undefined) return foundBinding.resolve(this);
    if (abstract instanceof Function) {
      return new ClassBinding(abstract, abstract as Class<T>).resolve(this);
    }
    throw new UnknownDependencyError(abstract);
  }

  public alias<T, D extends T>(abstract: Token<T>, concrete: Token<D>): void {
    if (!this.isBound(concrete)) {
      throw new UnknownDependencyError(concrete);
    }
    this.register(new AliasBinding(abstract, concrete));
  }

  public instance<T, D extends T>(abstract: Token<T>, instance: D): void {
    this.register(new ValueBinding(abstract, instance));
  }

  public bindFactory<T, D extends T>(abstract: Token<T>, factory: Factory<D>): void {
    this.register(new FactoryBinding(abstract, factory));
  }

  public singletonFactory<T, D extends T>(abstract: Token<T>, factory: Factory<D>): void {
    this.register(new SingletonBinding(new FactoryBinding(abstract, factory)));
  }

  public bind<T>(concrete: Class<T>): void;
  public bind<T, D extends T>(abstract: Token<T>, concrete: Class<D>, args?: Array<any>): void;
  public bind<T, D extends T>(abstract: Token<T>, concrete?: Class<D>, args?: Array<any>): void {
    this.register(new ClassBinding(abstract, concrete || abstract as Class<D>, args));
  }

  public singleton<T>(concrete: Class<T>): void;
  public singleton<T, D extends T>(abstract: Token<T>, concrete: Class<D>, args?: Array<any>): void;
  public singleton<T, D extends T>(abstract: Token<T>, concrete?: Class<D>, args?: Array<any>): void {
    this.register(new SingletonBinding(new ClassBinding(abstract, concrete || abstract as Class<D>, args)));
  }

  private register<T>(binding: Binding<T>): void {
    this.bindings.set(binding.getToken(), binding);
  }
}
