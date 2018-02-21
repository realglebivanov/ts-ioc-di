import { Class } from '@/class';
import { DependencyContainer } from '@/dependencies';
import { ClassMetadata } from './class.metadata';
import { ConstructorMetadata } from './constructor.metadata';

export class ClassMetadataFactory {
    public static create<T>(targetClass: Class<T>): ClassMetadata<T> {
        const dependencies = new DependencyContainer(targetClass);
        const constructorMetadata = new ConstructorMetadata(dependencies);
        return new ClassMetadata(targetClass, constructorMetadata, dependencies);
    }
}
