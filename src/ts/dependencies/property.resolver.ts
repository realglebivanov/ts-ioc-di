import lazy from 'lazy.js';

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
        lazy(this.metadata)
            .map((property: PropertyMetadata<T, any>) => property.getDependency())
            .filter((dependency: Dependency<any>) => dependency.isInjectable())
            .each((dependency: Dependency<any>) => callback(this.resolve(dependency)));
    }

    private resolve<D>(dependency: Dependency<D>): Property<D> {
        return {
            name: dependency.getName(),
            value: this.container.resolve(dependency.getClass())
        };
    }
}
