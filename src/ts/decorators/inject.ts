import { Class } from '@/container/class';
import { ClassMetadata } from '@/container/builders';

export function Inject<A, B, C extends Class<A>, D extends Class<B>>(abstract: C) {
    return function (target: B, property: string) {
        new ClassMetadata(target.constructor as D).addPropertyDependency(property, abstract);
    };
}
