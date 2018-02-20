import { Dictionary } from './dictionary';

export interface Class<T> extends Dictionary {
    new(...args: Array<any>): T;
    injectable?: boolean;
}
