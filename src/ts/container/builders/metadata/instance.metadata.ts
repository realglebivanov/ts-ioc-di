import Reflect from 'es7-reflect-metadata';

import { Class } from '@/container/class';
import { ClassDependency } from './class.dependency';

export class InstanceMetadata<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getDependencies(): Array<ClassDependency<any>> {
        return this.getInjectedProperties()
            .map((propertyKey: string) => this.createDependency(propertyKey))
            .filter((dependency: ClassDependency<any>) => dependency.isInjectableClass());
    }

    private createDependency(propertyKey: string): ClassDependency<any> {
        return new ClassDependency(this.getPropertyDependency(propertyKey), propertyKey);
    }

    private getPropertyDependency(propertyKey: string): any {
        return Reflect.getMetadata('design:type', this.target.prototype, propertyKey);
    }

    public defineMetadata(propertyKey: string): void {
        Reflect.defineMetadata('inject:properties', this.injectedPropertiesWith(propertyKey), this.target);
    }

    private injectedPropertiesWith(propertyKey: string): Array<string> {
        return [...this.getInjectedProperties(), propertyKey];
    }

    private getInjectedProperties(): Array<string> {
        return Reflect.getMetadata('inject:properties', this.target) || [];
    }
}
