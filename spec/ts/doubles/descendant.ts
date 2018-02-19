import { Inject, Injectable } from '@/decorators';
import { Singleton } from './singleton';
import { Root } from './root';

@Injectable
export class Descendant extends Root {
    @Inject()
    public singleton?: Singleton;
}
