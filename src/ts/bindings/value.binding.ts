import { Binding } from './binding';
import { Container } from '@/container';
import { Class } from '@/class';

export class ValueBinding<T> implements Binding<T> {
    public constructor(
        private abstract: Class<T>,
        private value: T
    ) { }

    public getClass(): Class<T> {
        return this.abstract;
    }

    public resolve(_: Container): T {
        return this.value;
    }
}
