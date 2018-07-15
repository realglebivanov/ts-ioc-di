import { Class } from '@/class';
import { Container } from '@/container';
import { ClassBuilder, ClassBuilderConfig } from './class.builder';

export type DecoratorFactory = (container: Container) => Decorator;
export type DecoratorConfig = { useCtorInjection?: boolean };
export type Decorator = (config?: DecoratorConfig) => <I, C extends Class<I>>(ctor: C) => C;

export class AutowiredBuilder {
  public getDecoratorFactory(): DecoratorFactory {
    return (
      (container: Container) =>
        ({ useCtorInjection = false }: DecoratorConfig = { useCtorInjection: false }) =>
          <I, C extends Class<I>>(ctor: C) => this.createClassProxy({ ctor, container, useCtorInjection })
    ) as DecoratorFactory;
  }

  private createClassProxy<I, C extends Class<I>>(config: ClassBuilderConfig<C>): C {
    return new ClassBuilder(config)
      .copyPrototype()
      .copyReflectMetadata()
      .copyStaticProperties()
      .getNewClass();
  }
}
