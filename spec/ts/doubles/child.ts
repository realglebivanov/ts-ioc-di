import { Inject, Injectable } from '@/decorators';
import { Singleton } from './singleton';

@Injectable
export class Child {
    @Inject()
    public singleton?: Singleton;
}
