import { Class } from '@/class';
import { Dependency } from '@/dependencies';
import { Dictionary } from '@/dictionary';

export class MethodMetadata<T extends Dictionary> {
    private resolvedDeps: Array<any> = [];

    public constructor(
        private name: string,
        private target: Class<T> | T,
        private descriptor: PropertyDescriptor
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
        return this.getParamTypes().map((type: any) => new Dependency(type, this.name));
    }

    private getParamTypes(): Array<any> {
        return Reflect.getOwnMetadata('design:paramtypes', this.target, this.name) || [];
    }
}
