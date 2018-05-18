import { Class } from '@/class';
import { Container } from '@/container';
import { MetadataProxy } from '@/metadata';
import { InstanceBuilder } from './instance.builder';

export class InstanceBuilderFactory {
  public static create<T>(target: Class<T>, container: Container): InstanceBuilder<T> {
    const metadata = new MetadataProxy(target);
    return new InstanceBuilder(
      metadata.getMethodResolver(container),
      metadata.getPropertyResolver(container),
      metadata.getConstructorResolver(container)
    );
  }
}
