import { Class } from '@/class';
import { MetadataProxy } from '@/metadata';

export function InjectArgs<A, B extends Class<A>>() {
    return function(target: A | B, method: string, descriptor: PropertyDescriptor): void {
        new MetadataProxy(target.constructor as B).addMethod(method, descriptor);
    };
}
