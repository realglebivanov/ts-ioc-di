import { Token } from './token';

export class ClassDependency<T> {
    public constructor(
        private type: any,
        private name?: string
    ) { }

    public getName(): string {
        return this.name || '';
    }

    public isInjectableClass(): boolean {
        return this.type && this.type.injectable;
    }

    public getToken(): Token<T> {
        return new Token(this.type);
    }
}
