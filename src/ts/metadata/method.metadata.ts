import { Class } from '@/class';
import { Dependency } from '@/dependencies';
import { Dictionary } from '@/dictionary';

export class MethodMetadata<T extends Dictionary> {
    public constructor(
        private target: Class<T> | T,
        private name?: string
    ) { }

    public getOriginalMethod(): Function {
        return this.name === undefined ? this.target : this.target[this.name];
    }

    public getName(): string {
        return this.name || '';
    }

    public getDependencies(): Array<Dependency<any>> {
        return this.getParamTypes().map((type: any) => new Dependency(type, this.name));
    }

    private getParamTypes(): Array<any> {
        return Reflect.getOwnMetadata('design:paramtypes', this.target, <string> this.name) || [];
    }
}
