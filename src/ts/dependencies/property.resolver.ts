import { Container } from '@/container';
import { PropertyMetadata } from '@/metadata';

import { Dependency } from './dependency';

export type Property<T> = { name: string, value: T };
export type PropertyCallback<T> = (property: Property<T>) => void;

export class PropertyResolver<T> {
  public constructor(
    private container: Container,
    private metadata: Array<PropertyMetadata<T, any>>
  ) { }

  public resolveAll(callback: PropertyCallback<any>): void {
    this.metadata.forEach((property: PropertyMetadata<T, any>) => {
      const dependency = property.getDependency();
      const isInjectable = dependency.isInjectable();
      if (isInjectable) callback(this.resolve(dependency));
    });
  }

  private resolve<D>(dependency: Dependency<D>): Property<D> {
    return {
      name: dependency.getName(),
      value: this.container.resolve(dependency.getToken())
    };
  }
}
