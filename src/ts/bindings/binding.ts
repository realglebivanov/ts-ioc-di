import { Container } from '@/container';
import { Token } from '@/token';

export interface Binding<T> {
  getToken(): Token<T>;

  resolve(container: Container): T;
}
