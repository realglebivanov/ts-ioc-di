import { Class } from '@/class';

export type ClassWithProperties<T> = Class<T> & { [key: string]: any; };

export class ClassBuilder<T> {
  public constructor(
    private newClass: ClassWithProperties<T>
  ) { }

  public copyPrototype(ctor: ClassWithProperties<T>): ClassBuilder<T> {
    this.newClass.prototype = ctor.prototype;
    this.newClass.prototype.constructor = this.newClass;
    return this;
  }

  public copyStaticProperties(ctor: ClassWithProperties<T>): void {
    Object.getOwnPropertyNames(ctor).forEach((propertyName: string) => {
      if (ctor.propertyIsEnumerable(propertyName)) {
        this.newClass[propertyName] = ctor[propertyName];
      }
    });
  }
}
