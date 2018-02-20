import { Class } from '@/class';
import { MetadataProxy } from '@/metadata';

export function Inject<A, B, C extends Class<A>, D extends Class<B>>
    (dependency?: C): (target: B, propertyKey: string) => void;

export function Inject<A, B, C extends Class<A>, D extends Class<B>>
    (): (target: B, propertyKey: string, propertyDescriptor: PropertyDescriptor) => void;

export function Inject<A, B, C extends Class<A>, D extends Class<B>>(dependency?: C) {
    return function(target: B, propertyKey: string, propertyDescriptor?: PropertyDescriptor): void {
        const metadataProxy = new MetadataProxy(target.constructor as D);
        propertyDescriptor === undefined ?
            metadataProxy.addProperty(propertyKey, dependency) :
            metadataProxy.addMethod(propertyKey);
    };
}
