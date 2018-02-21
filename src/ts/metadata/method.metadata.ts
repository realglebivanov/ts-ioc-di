import { Dependency, DependencyContainer } from '@/dependencies';

export class MethodMetadata<T> {
    private resolvedDeps: Array<any> = [];

    public constructor(
        private name: string,
        private descriptor: PropertyDescriptor,
        private methodArguments: DependencyContainer<T>
    ) {
        this.decorateTargetMethod(this, descriptor.value);
    }

    public setResolvedDeps(resolvedDeps: Array<any>): void {
        this.resolvedDeps = resolvedDeps;
    }

    public decorateTargetMethod(context: MethodMetadata<T>, originalMethod: Function): void {
        this.descriptor.value = function () {
            return originalMethod.apply(this, context.resolvedDeps.concat(arguments));
        };
    }

    public getDependencies(): Array<Dependency<any>> {
        return this.methodArguments.getMethodOrConstructorDependencies(this.name);
    }
}
