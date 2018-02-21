import { Class } from '@/class';
import { Dependency } from '@/dependencies';

export class ConstructorMetadata<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getDependencies(): Array<Dependency<any>> {
        return this.getParamTypes().map((type: any) => new Dependency(type));
    }

    private getParamTypes(): Array<any> {
        return Reflect.getOwnMetadata('design:paramtypes', this.target) || [];
    }
}