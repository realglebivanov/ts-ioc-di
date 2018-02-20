import lazy from 'lazy.js';

import { Container } from '@/container';
import { PropertyMetadata } from '@/metadata';

import { Dependency } from './dependency';
import { ResolvedDependency, ResolvedDependencyCallback } from './resolved-dependency';

export class PropertyResolver<T> {
    public constructor(
        private container: Container,
        private metadata: Array<PropertyMetadata<T, any>>
    ) { }

    public resolveAll(callback: ResolvedDependencyCallback): void {
        lazy(this.metadata)
            .map((property: PropertyMetadata<T, any>) => property.getDependency())
            .filter((dependency: Dependency<any>) => dependency.isInjectable())
            .each((dependency: Dependency<any>) => callback(this.resolve(dependency)));
    }

    private resolve(dependency: Dependency<any>): ResolvedDependency {
        return {
            name: dependency.getName(),
            value: this.container.resolve(dependency.getClass())
        };
    }
}
