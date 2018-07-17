import { Dependency } from '@/dependencies';
import { Token } from '@/token';

export class PropertyMetadata<T, D> {
  public constructor(
    private name: string,
    private target: T,
    private type?: Token<D>
  ) { }

  public getDependency(): Dependency<D> {
    return new Dependency(this.getType(), this.name);
  }

  private getType(): Token<D> {
    return this.type || Reflect.getMetadata('design:type', this.target, this.name);
  }
}
