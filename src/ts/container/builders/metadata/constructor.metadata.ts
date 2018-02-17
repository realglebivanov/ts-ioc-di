import Reflect from 'es7-reflect-metadata';

import { Class } from '@/container/class';
import { ClassDependency } from './class.dependency';

export class ConstructorMetadata<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getDependencies(): Array<ClassDependency<any>> {
        return this.getCtorParamTypes().map((type: any) => new ClassDependency(type));
    }

    private getCtorParamTypes(): Array<any> {
        return Reflect.getMetadata('design:paramtypes', this.target) || [];
    }
}
