import { Inject } from '@/decorators';
import { Singleton } from './singleton';

export class PrimitiveTest {
  @Inject('singleton')
  public s1?: Singleton;

  @Inject('singleton')
  public s2?: Singleton;
}
