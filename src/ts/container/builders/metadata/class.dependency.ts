import { Class } from '@/container/class';

export class ClassDependency<T> {
    public constructor(
        private type: Class<T>,
        private name?: string
    ) { }

    public getClass(): Class<T> {
        return this.type;
    }

    public getName(): string {
        return this.name || '';
    }

    public isInjectable(): boolean {
        return Boolean(this.type && this.type.injectable);
    }
}
