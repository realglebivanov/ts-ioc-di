import { Class } from '@/container/class';
import { Container } from '@/container/container';

import { ConstructorResolver, PropertyResolver } from './resolvers';
import { ClassBuilder } from './class.builder';
import { ClassMetadataFactory } from './metadata';

export class ClassBuilderFactory {
    public static create<T>(concrete: Class<T>, container: Container): ClassBuilder<T> {
        const metadata = ClassMetadataFactory.create(concrete);
        return new ClassBuilder(
            new PropertyResolver(metadata, container),
            new ConstructorResolver(container, concrete, metadata)
        );
    }
}
