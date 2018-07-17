import { Class } from '@/class';
import { Token } from '@/token';
import { MetadataProxy } from '@/metadata';

export function Inject<A, B, C extends Class<B>>(dependency?: Token<A>) {
  return function (target: B, propertyKey: string): void {
    new MetadataProxy(target.constructor as C).addProperty(propertyKey, dependency);
  };
}
