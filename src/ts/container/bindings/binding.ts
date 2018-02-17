import { Container } from '@/container/container';
import { Token } from '@/container/builders';

export interface Binding<T> {
    getToken(): Token<T>;
    resolve(container: Container): T;
}
