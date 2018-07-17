import { Class } from '@/class';
import { Token } from '@/token';
import { MetadataProxy } from '@/metadata';

export function InjectArg<A, B, C extends Class<B>>(dependency: Token<A>) {
  return function (target: C | B, method: string, parameterIndex: number): void {
    const realTarget = method === undefined ? target : target.constructor;
    const metadataProxy = new MetadataProxy(realTarget as C);
    metadataProxy.addMethodParameter(method, parameterIndex, dependency);
  };
}
