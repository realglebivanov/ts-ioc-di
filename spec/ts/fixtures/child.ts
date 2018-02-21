import { Inject, InjectArg, InjectArgs, Injectable } from '@/decorators';
import { Singleton } from './singleton';

import { Service } from './service';
import { MockService } from './mock.service';

@Injectable
export class Child {
    public constructor(
        @InjectArg(MockService) public s1: Service
    ) { }

    @Inject()
    public singleton?: Singleton;

    @InjectArgs()
    public serviceTest(@InjectArg(MockService) s2?: Service): Service {
        return s2 as Service;
    }
}
