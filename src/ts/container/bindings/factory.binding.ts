import { Binding } from './binding';
import { Container } from '@/container/container';
import { Token } from '@/container/builders';
import { Class } from '@/container/class';

export type Factory<T> = (container: Container) => T;

export class FactoryBinding<T> implements Binding<T> {
    public constructor(
        private abstract: Class<T>,
        private factory: Factory<T>
    ) { }

    public getToken(): Token<T> {
        return new Token(this.abstract);
    }

    public resolve(container: Container): T {
        return this.factory(container);
    }
}
