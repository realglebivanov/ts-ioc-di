import { Class } from '@/class';
import { MetadataProxy } from '@/metadata';

export function Inject<A, B, C extends Class<A>, D extends Class<B>>(dependency?: C) {
  return function (target: B, propertyKey: string): void {
    new MetadataProxy(target.constructor as D).addProperty(propertyKey, dependency);
  };
}
