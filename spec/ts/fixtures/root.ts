import { Inject, Injectable, InjectArgs } from '@/decorators';
import { Child } from './child';
import { Singleton } from './singleton';

@Injectable
export class Root {
  @Inject(Singleton)
  public singleton?: Singleton;

  public constructor(
    public child: Child
  ) { }

  @InjectArgs()
  public test(s?: Singleton): Singleton {
    return s as Singleton;
  }
}
