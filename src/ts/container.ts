import { Class } from './class';
import { Token } from './token';
import { Memento } from './memento';
import { ResolutionError } from './errors';

import {
  Binding,
  ClassBinding,
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
    throw new ResolutionError(abstract);
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

  public bind<D>(abstract: string, concrete: D, args?: Array<any>): void;
  public bind<D>(abstract: symbol, concrete: D, args?: Array<any>): void;
  public bind<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void;
  public bind<T, D extends T>(abstract: Token<T>, concrete?: Class<D>, args?: Array<any>): void {
    const realConcrete = concrete || abstract as Class<D>;
    const classBinding = new ClassBinding(abstract, realConcrete, args);
    this.register(classBinding);
  }

  public singleton<D>(abstract: string, concrete: D, args?: Array<any>): void;
  public singleton<D>(abstract: symbol, concrete: D, args?: Array<any>): void;
  public singleton<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void;
  public singleton<T, D extends T>(abstract: Token<T>, concrete: Class<D>, args?: Array<any>): void {
    const realConcrete = concrete || abstract as Class<D>;
    const classBinding = new ClassBinding(abstract, realConcrete, args);
    this.register(new SingletonBinding(classBinding));
  }

  private register<T>(binding: Binding<T>): void {
    this.bindings.set(binding.getToken(), binding);
  }
}
