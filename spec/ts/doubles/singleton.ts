import { Inject, Injectable } from '@/decorators';

@Injectable
export class Singleton {
    public static id: number = 0;
    public id: number;

    public constructor() {
        this.id = Singleton.id++;
    }
}
