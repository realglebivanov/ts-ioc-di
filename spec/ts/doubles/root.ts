import { Inject, Injectable } from '@/decorators';
import { Child } from './child';
import { Singleton } from './singleton';

@Injectable
export class Root {
    public constructor(
        public child: Child
    ) { }

    @Inject(Singleton)
    public singleton?: Singleton;
}
