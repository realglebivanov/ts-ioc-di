import { Binding } from './binding';
import { Container } from '@/container/container';
import { Class } from '@/container/class';

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
