import { Class } from '@/container/class';
import { ClassMetadataFactory } from '@/container/builders';

export function Inject<A, B, C extends Class<A>, D extends Class<B>>(dependency?: C) {
    return function(target: B, propertyKey: string): void {
        ClassMetadataFactory
            .create(target.constructor as D)
            .addPropertyDependency(propertyKey, dependency);
    };
}
