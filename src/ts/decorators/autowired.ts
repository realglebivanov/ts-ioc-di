import { Class } from '@/class';
import { Container } from '@/container';
import { InstanceBuilderFactory } from '@/builders';

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
          this.makeClassProxy(ctor, useCtorInjection)
    ) as Decorator;
  }

  private makeClassProxy<I, C extends Class<I>>(ctor: C, useCtorInjection: boolean): C {
    const newClass: any = (...args: Array<any>) => this.makeClassInstance(ctor, args, useCtorInjection);
    newClass.prototype = ctor.prototype;
    for (const propertyName in ctor) newClass[propertyName] = ctor[propertyName];
    return newClass as C;
  }

  private makeClassInstance<I, C extends Class<I>>(ctor: C, args: Array<any>, useCtorInjection: boolean): I {
    const container = this.containers.get(ctor) || this.defaultContainer;
    if (container === undefined) throw new Error('Cannot resolve class without container instance');

    const instanceBuilder = InstanceBuilderFactory.create(ctor, container);
    useCtorInjection ? instanceBuilder.createInstance(args) : instanceBuilder.setProduct(new ctor(...args));

    return instanceBuilder.injectMethods().injectProperties().getProduct();
  }
}

export const autowiredBuilder = new AutowiredBuilder();
export const Autowired = autowiredBuilder.getDecorator();

