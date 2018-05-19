import { Class } from '@/class';
import { Container } from '@/container';
import { ClassBuilder } from './class.builder';
import { InstanceBuilderFactory } from './instance.builder.factory';

export type Decorator = (useCtorInjection?: boolean) => <I, C extends Class<I>>(ctor: C) => C;

export class AutowiredBuilder {
  private containers: Map<Class<any>, Container> = new Map();
  private defaultContainer?: Container;

  public setContainer<I, C extends Class<I>>(ctor: C, container: Container): void {
    this.containers.set(ctor, container);
  }

  public setDefaultContainer(container: Container): void {
    this.defaultContainer = container;
  }

  public getDecorator<I, C extends Class<I>>(): Decorator {
    return (
      (useCtorInjection: boolean = false) =>
        (ctor: C) =>
          this.createClassProxy(ctor, useCtorInjection)
    ) as Decorator;
  }

  private createClassProxy<I, C extends Class<I>>(ctor: C, useCtorInjection: boolean): C {
    const newClass: any = (...args: Array<any>) => this.createClassInstance(ctor, args, useCtorInjection);
    new ClassBuilder(newClass).copyPrototype(ctor).copyStaticProperties(ctor);
    return newClass as C;
  }

  private createClassInstance<I, C extends Class<I>>(ctor: C, args: Array<any>, useCtorInjection: boolean): I {
    const instanceBuilder = InstanceBuilderFactory.create(ctor, this.containerFor(ctor)).injectMethods();
    useCtorInjection ? instanceBuilder.createInstance(args) : instanceBuilder.setProduct(new ctor(...args));
    return instanceBuilder.injectProperties().getProduct();
  }

  private containerFor<T>(ctor: Class<T>): Container {
    const container = this.containers.get(ctor) || this.defaultContainer;
    if (container === undefined) throw new Error('Cannot resolve class without container instance');
    return container;
  }
}

export const autowiredBuilder = new AutowiredBuilder();
