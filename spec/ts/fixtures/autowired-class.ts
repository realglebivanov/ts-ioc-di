import { Autowired, Inject } from '@/decorators';
import { Singleton } from './singleton';

@Autowired(true)
export class AutowiredClass {
  public constructor(
    public singleton2?: Singleton
  ) { }

  @Inject()
  public singleton?: Singleton;
}
