import { Binding } from './binding';
import { Container } from '@/container';
import { Class } from '@/class';

export class SingletonBinding<T> implements Binding<T> {
    private resolved: T | null = null;

    public constructor(
        private binding: Binding<T>
    ) { }

    public getClass(): Class<T> {
        return this.binding.getClass();
    }

    public resolve(container: Container): T {
        return (this.resolved === null) ?
            this.resolved = this.binding.resolve(container) :
            this.resolved;
    }
}
