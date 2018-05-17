import { Inject, Injectable, InjectArg, InjectArgs } from '@/decorators';
import { Singleton } from './singleton';

import { Service } from './service';
import { MockService } from './mock.service';

@Injectable
export class Child {
  @Inject()
  public singleton?: Singleton;

  public constructor(
    @InjectArg(MockService) public s1: Service
  ) { }

  @InjectArgs()
  public serviceTest(@InjectArg(MockService) s2?: Service): Service {
    return s2 as Service;
  }
}
