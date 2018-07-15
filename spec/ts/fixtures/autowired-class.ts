import { createAutowiredDecorator, Inject } from '@/decorators';
import { Singleton } from './singleton';
import { container } from './container';

const Autowired = createAutowiredDecorator(container);

@Autowired({ useCtorInjection: true })
export class AutowiredClass {
  public constructor(
    public singleton2?: Singleton
  ) { }

  @Reflect.metadata('doesntWork', false)
  public static test: string = 'test';

  @Reflect.metadata('works', true)
  public test: string = 'test';

  @Inject()
  public singleton?: Singleton;
}
