import { Class } from '@/container/class';

import { ClassDependency } from './class.dependency';
import { InstanceMetadata } from './instance.metadata';
import { ConstructorMetadata } from './constructor.metadata';

export class ClassMetadata<T> {
    private instanceMetadata: InstanceMetadata<T>;
    private constructorMetadata: ConstructorMetadata<T>;

    public constructor(target: Class<T>) {
        this.instanceMetadata = new InstanceMetadata(target);
        this.constructorMetadata = new ConstructorMetadata(target);
    }

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
