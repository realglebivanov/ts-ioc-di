import { Class } from '@/container/class';
import { Container } from '@/container/container';
import { ClassMetadata, ClassDependency } from '@/container/builders/metadata';

import { Property } from './property';

type PropertyCallback = (property: Property) => void;

export class PropertyResolver<T> {
    private container?: Container;
    private metadata: ClassMetadata<T>;

    public constructor(concrete: Class<T>) {
        this.metadata = new ClassMetadata(concrete);
    }

    public setContainer(container: Container): void {
        this.container = container;
    }

    public forEachProperty(callback: PropertyCallback): void {
        this.metadata.getPropertyDependencies().forEach(
            (dependency: ClassDependency<any>) => callback(this.resolve(dependency))
        );
    }

    private resolve(dependency: ClassDependency<any>): Property {
        return {
            name: dependency.getName(),
            value: (<Container> this.container).resolve(dependency.getToken().getSource())
        };
    }
}
