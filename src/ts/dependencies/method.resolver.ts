import { Container } from '@/container';
import { MethodMetadata } from '@/metadata';

import { Dependency } from './dependency';
import { ResolvedDependencyCallback } from './resolved-dependency';

export class MethodResolver<T> {
    public constructor(
        private container: Container,
        private metadata: Array<MethodMetadata<T>>,
    ) { }

    public resolveAll(callback: ResolvedDependencyCallback): void {
        this.metadata.forEach((method: MethodMetadata<T>) => callback({
            name: method.getName(),
            value: this.createNewMethod(method.getOriginalMethod(), this.resolveDeps(method))
        }));
    }

    private createNewMethod(originalMethod: Function, resolvedDeps: Array<any>): Function {
        return function () {
            return originalMethod.apply(this, resolvedDeps.concat(arguments));
        };
    }

    private resolveDeps(method: MethodMetadata<T>): Array<any> {
        return method.getDependencies()
            .filter((dependency: Dependency<any>) => dependency.isInjectable())
            .map((dependency: Dependency<any>) => this.container.resolve(dependency.getClass()));
    }
}
