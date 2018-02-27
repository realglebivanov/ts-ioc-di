import { Class } from '@/class';
import { ClassMetadata } from './class.metadata';
import { ClassMetadataFactory } from './class.metadata.factory';

export class MetadataStorage<T> {
    private metadataKey: symbol = Symbol.for('@@_inject:metadata');

    public constructor(
        private target: Class<T>
    ) { }

    public getMetadata(): ClassMetadata<T> {
        return this.fetchMetadata() || this.defineMetadata();
    }

    private fetchMetadata(): ClassMetadata<T> {
        return Reflect.getOwnMetadata(this.metadataKey, this.target);
    }

    private defineMetadata(): ClassMetadata<T> {
        const newMetadata = ClassMetadataFactory.create(this.target);
        Reflect.defineMetadata(this.metadataKey, newMetadata, this.target);
        return newMetadata;
    }
}
