import { Container } from '@/container';
import { Class } from '@/class';

export interface Binding<T> {
  getClass(): Class<T>;

  resolve(container: Container): T;
}
