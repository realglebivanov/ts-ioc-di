import { Class } from '@/class';
import { Dependency } from '@/dependencies';

export class PropertyMetadata<T, D> {
    public constructor(
        private target: Class<T>,
        private name: string,
        private type: D
    ) { }

    public getDependency(): Dependency<any> {
        return new Dependency(this.getType(), this.name);
    }

    private getType(): any {
        return this.type || Reflect.getMetadata('design:type', this.target.prototype, this.name);
    }
}
