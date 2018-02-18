import { Container } from '@/container/container';
import { Class } from '@/container/class';

export interface Binding<T> {
    getClass(): Class<T>;
    resolve(container: Container): T;
}
