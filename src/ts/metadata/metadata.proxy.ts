import {
    ConstructorResolver,
    PropertyResolver,
    MethodResolver
} from '@/dependencies';

import { Class } from '@/class';
import { Container } from '@/container';
import { ClassMetadata } from './class.metadata';
import { MetadataStorage } from './metadata.storage';

export class MetadataProxy<T> {
    private metadata: ClassMetadata<T>;

    public constructor(private target: Class<T>) {
        this.metadata = new MetadataStorage(target).getMetadata();
    }

    public getPropertyResolver(container: Container): PropertyResolver<T> {
        return new PropertyResolver(container, this.metadata.getProperties());
    }

    public getMethodResolver(container: Container): MethodResolver<T> {
        return new MethodResolver(container, this.metadata.getMethods());
    }

    public getConstructorResolver(container: Container): ConstructorResolver<T> {
        return new ConstructorResolver(container, this.target, this.metadata.getConstructor());
    }

    public addMethod(name: string, descriptor: PropertyDescriptor): void {
        this.metadata.addMethod(name, descriptor);
    }

    public addProperty<D>(name: string, type: D): void {
        this.metadata.addProperty(name, type);
    }
}
