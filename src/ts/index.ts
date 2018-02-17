import { Container } from './container/container';
import { Injectable, Inject } from './decorators';
import { Token } from './container/builders';

@Injectable
class Rest {
    public static id: number = 1;
    public id: number;

    public constructor() {
        this.id = Rest.id++;
    }
}

@Injectable
class Best {
    public constructor(
        private rest: Rest
    ) { }
}

@Injectable
export class Test {
    public constructor(
        private b: Best
    ) { }

    @Inject(Rest)
    private r?: Rest;

    @Inject(Best)
    private s?: Best;
}


const container = new Container();
// container.bind(Test, TestImpl);
container.singleton(Rest);

(<any>window).container = container;
(<any>window).Token = Token;
(<any>window).Test = Test;
