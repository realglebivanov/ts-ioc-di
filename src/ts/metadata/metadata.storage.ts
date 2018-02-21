import { Class } from '@/class';
import { ClassMetadata } from './class.metadata';
import { ClassMetadataFactory } from './class.metadata.factory';

export class MetadataStorage<T> {
    public constructor(
        private target: Class<T>
    ) { }

    public getMetadata(): ClassMetadata<T> {
        return this.fetchMetadata() || this.defineMetadata();
    }

    private fetchMetadata(): ClassMetadata<T> {
        return Reflect.getOwnMetadata('@@_inject:metadata', this.target);
    }

    private defineMetadata(): ClassMetadata<T> {
        const newMetadata = ClassMetadataFactory.create(this.target);
        Reflect.defineMetadata('@@_inject:metadata', newMetadata, this.target);
        return newMetadata;
    }
}
