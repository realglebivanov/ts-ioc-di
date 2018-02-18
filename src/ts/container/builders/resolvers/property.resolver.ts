import { Container } from '@/container/container';
import { ClassMetadata, ClassDependency } from '@/container/builders/metadata';

import { Property } from './property';

export type PropertyCallback = (property: Property) => void;

export class PropertyResolver<T> {
    public constructor(
        private metadata: ClassMetadata<T>,
        private container: Container
    ) { }

    public forEachProperty(callback: PropertyCallback): void {
        this.metadata.getPropertyDependencies().forEach(
            (dependency: ClassDependency<any>) => callback(this.resolve(dependency))
        );
    }

    private resolve(dependency: ClassDependency<any>): Property {
        return {
            name: dependency.getName(),
            value: this.container.resolve(dependency.getClass())
        };
    }
}
