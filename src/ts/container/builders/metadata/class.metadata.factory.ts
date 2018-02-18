import { Class } from '@/container/class';

import { ClassMetadata } from './class.metadata';
import { InstanceMetadata } from './instance.metadata';
import { ConstructorMetadata } from './constructor.metadata';

export class ClassMetadataFactory {
    public static create<T>(target: Class<T>): ClassMetadata<T> {
        return new ClassMetadata(
            new InstanceMetadata(target),
            new ConstructorMetadata(target)
        );
    }
}
