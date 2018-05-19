import { Class } from '@/class';

export class ClassBuilder<T> {
  public constructor(
    private newClass: Class<T>
  ) { }

  public copyPrototype(ctor: Class<T>): ClassBuilder<T> {
    this.newClass.prototype = ctor.prototype;
    this.newClass.prototype.constructor = this.newClass;
    return this;
  }

  public copyStaticProperties(ctor: Class<T>): void {
    Object.getOwnPropertyNames(ctor).forEach((propertyName: string) => {
      if (ctor.propertyIsEnumerable(propertyName)) {
        this.newClass[propertyName] = ctor[propertyName];
      }
    });
  }
}
