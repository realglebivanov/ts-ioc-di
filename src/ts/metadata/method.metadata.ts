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
        this.descriptor.value = function (...args: Array<any>) {
            return originalMethod.apply(this, context.resolvedDeps.concat(args));
        };
    }

    public getDependencies(): Array<Dependency<any>> {
        return this.methodArguments.getMethodOrCtorDependencies(this.name);
    }
}
