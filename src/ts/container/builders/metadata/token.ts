import { Class } from '@/container/class';

export class Token<T> {
    public constructor(
        private source: Class<T>
    ) { }

    public getSource(): Class<T> {
        return this.source;
    }
}
