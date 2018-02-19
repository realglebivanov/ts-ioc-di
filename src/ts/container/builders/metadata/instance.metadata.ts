import { Class } from '@/container/class';
import { ClassDependency } from './class.dependency';

export class InstanceMetadata<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getDependencies(): Array<ClassDependency<any>> {
        return this.getInjectedProperties().map((propertyKey: string) => {
            return new ClassDependency(this.getDependencyClass(propertyKey), propertyKey);
        });
    }

    private getDependencyClass(propertyKey: string): any {
        return Reflect.getMetadata('inject:type', Object.getPrototypeOf(this.target), propertyKey)
            || Reflect.getMetadata('design:type', Object.getPrototypeOf(this.target), propertyKey);
    }

    public defineMetadata<D>(propertyKey: string, dependency: D): void {
        Reflect.defineMetadata('inject:type', dependency, Object.getPrototypeOf(this.target), propertyKey);
        Reflect.defineMetadata('inject:properties', this.injectedPropertiesWith(propertyKey), this.target);
    }

    private injectedPropertiesWith(propertyKey: string): Array<string> {
        return [...this.getInjectedProperties(), propertyKey];
    }

    private getInjectedProperties(): Array<string> {
        return Reflect.getMetadata('inject:properties', this.target) || [];
    }
}
