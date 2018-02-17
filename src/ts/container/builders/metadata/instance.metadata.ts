import Reflect from 'es7-reflect-metadata';

import { Class } from '@/container/class';
import { ClassDependency } from './class.dependency';

export class InstanceMetadata<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getDependencies(): Array<ClassDependency<any>> {
        return this.getInjectedProperties().map(
            (name: string) => new ClassDependency(this.getPropertyDependency(name), name)
        );
    }

    public defineMetadata<D>(propertyKey: string, dependency: D): void {
        Reflect.defineMetadata('inject:property', dependency, this.target, propertyKey);
        Reflect.defineMetadata('inject:properties', this.injectedPropertiesWith(propertyKey), this.target);
    }

    private getPropertyDependency(propertyKey: string): any {
        return Reflect.getMetadata('inject:property', this.target, propertyKey);
    }

    private injectedPropertiesWith(propertyKey: string): Array<string> {
        return [...this.getInjectedProperties(), propertyKey];
    }

    private getInjectedProperties(): Array<string> {
        return Reflect.getMetadata('inject:properties', this.target) || [];
    }
}
