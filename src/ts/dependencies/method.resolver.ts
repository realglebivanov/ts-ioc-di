import { Container } from '@/container';
import { MethodMetadata } from '@/metadata';

import { Dependency } from './dependency';

export class MethodResolver<T> {
    public constructor(
        private container: Container,
        private metadata: Array<MethodMetadata<T>>,
    ) { }

    public resolveDependencies(): void {
        this.metadata.forEach((method: MethodMetadata<T>) =>
            method.setResolvedDeps(this.resolveDeps(method))
        );
    }

    private resolveDeps(method: MethodMetadata<T>): Array<any> {
        return method.getDependencies()
            .filter((dependency: Dependency<any>) => dependency.isInjectable())
            .map((dependency: Dependency<any>) => this.container.resolve(dependency.getClass()));
    }
}
