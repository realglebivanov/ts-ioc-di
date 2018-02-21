import { Class } from '@/class';
import { MetadataProxy } from '@/metadata';

export function InjectArg<A, B, C extends Class<A>, D extends Class<B>>(dependency: C) {
    return function (target: D | B, method: string, parameterIndex: number): void {
        const realTarget = method === undefined ? target : target.constructor;
        const metadataProxy = new MetadataProxy(realTarget as D);
        metadataProxy.addMethodParameter(method, parameterIndex, dependency);
    };
}
