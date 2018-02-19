import { ClassDependency } from './class.dependency';
import { InstanceMetadata } from './instance.metadata';
import { ConstructorMetadata } from './constructor.metadata';

export class ClassMetadata<T> {
    public constructor(
        private instanceMetadata: InstanceMetadata<T>,
        private constructorMetadata: ConstructorMetadata<T>,
    ) { }

    public getCtorDependencies(): Array<ClassDependency<any>> {
        return this.constructorMetadata.getDependencies();
    }

    public getPropertyDependencies(): Array<ClassDependency<any>> {
        return this.instanceMetadata.getDependencies();
    }

    public addPropertyDependency<D>(propertyKey: string, dependency: D): void {
        this.instanceMetadata.defineMetadata(propertyKey, dependency);
    }
}
