import { Class } from '@/class';
import { Container } from '@/container';
import { MetadataProxy } from '@/metadata';
import { ClassBuilder } from './class.builder';

export class ClassBuilderFactory {
    public static create<T>(target: Class<T>, container: Container): ClassBuilder<T> {
        const metadata = new MetadataProxy(target);
        return new ClassBuilder(
            metadata.getMethodResolver(container),
            metadata.getPropertyResolver(container),
            metadata.getConstructorResolver(container)
        );
    }
}
