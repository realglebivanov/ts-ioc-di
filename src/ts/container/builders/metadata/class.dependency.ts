import { Class } from '@/container/class';
import { Token } from './token';

export class ClassDependency<T> {
    public constructor(
        private type: Class<any>,
        private name?: string
    ) { }

    public getName(): string {
        return this.name || '';
    }

    public isInjectableClass(): boolean {
        return Boolean(this.type && this.type.injectable);
    }

    public getToken(): Token<T> {
        return new Token(this.type);
    }
}
