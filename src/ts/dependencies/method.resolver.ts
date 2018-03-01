import { Container } from '@/container';
import { MethodMetadata } from '@/metadata';

import { DependencyResolver } from './dependency.resolver';

export class MethodResolver<T> {
    public constructor(
        private container: Container,
        private metadata: Array<MethodMetadata<T>>,
    ) { }

    public resolveDependencies(): void {
        this.metadata.forEach((method: MethodMetadata<T>) =>
            method.setResolver(this.getResolverFor(method))
        );
    }

    private getResolverFor(method: MethodMetadata<T>): DependencyResolver {
        return new DependencyResolver(this.container, method.getDependencies());
    }
}
