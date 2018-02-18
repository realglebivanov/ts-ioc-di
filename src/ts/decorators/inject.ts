import { Class } from '@/container/class';
import { ClassMetadataFactory } from '@/container/builders';

export function Inject<A, B extends Class<A>>(target: A, propertyKey: string): void {
    ClassMetadataFactory.create(target.constructor as B).addPropertyDependency(propertyKey);
}
