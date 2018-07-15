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

  private fetchMetadata(): ClassMetadata<T> | undefined {
    return this.target.___inject_metadata;
  }

  private defineMetadata(): ClassMetadata<T> {
    const newMetadata = ClassMetadataFactory.create(this.target);
    this.target.___inject_metadata = newMetadata;
    return newMetadata;
  }
}
