import { Class } from '@/class';
import { InstanceBuilderFactory } from '@/builders/instance.builder.factory';
import { Container } from '@/container';

export type ClassBuilderConfig<C> = {
  ctor: C,
  useCtorInjection: boolean,
  container: Container
};

export type ClassWithProperties<I> = Class<I> & { [key: string]: any; };

export class ClassBuilder<I, C extends ClassWithProperties<I>> {
  private newClass: C = (((...args: Array<any>) => this.createClassInstance(args)) as Function) as C;

  public constructor(
    private config: ClassBuilderConfig<C>
  ) { }

  public getNewClass(): C {
    return this.newClass;
  }

  public copyPrototype(): ClassBuilder<I, C> {
    this.newClass.prototype = this.config.ctor.prototype;
    this.newClass.prototype.constructor = this.newClass;
    return this;
  }

  public copyReflectMetadata(): ClassBuilder<I, C> {
    this.getClassPropsNames().forEach((propertyKey: string | never) => {
      Reflect.getMetadataKeys(this.config.ctor, propertyKey).forEach((metadataKey: string) => {
        const metadataValue = Reflect.getMetadata(metadataKey, this.config.ctor, propertyKey);
        Reflect.defineMetadata(metadataKey, metadataValue, this.newClass, propertyKey);
      });
    });
    return this;
  }

  public copyStaticProperties(): ClassBuilder<I, C> {
    Object.getOwnPropertyNames(this.config.ctor).forEach((propertyName: string) => {
      if (this.config.ctor.propertyIsEnumerable(propertyName)) {
        this.newClass[propertyName] = this.config.ctor[propertyName];
      }
    });
    return this;
  }

  private createClassInstance(args: Array<any>): I {
    const instanceBuilder = InstanceBuilderFactory.create(this.config.ctor, this.config.container).injectMethods();
    this.config.useCtorInjection ?
      instanceBuilder.createInstance(args) :
      instanceBuilder.setProduct(new (this.config.ctor as Class<I>)(...args));
    return instanceBuilder.injectProperties().getProduct();
  }

  private getClassPropsNames(): Array<string | never> {
    return (Object.getOwnPropertyNames(this.config.ctor) as Array<string | never>).concat(undefined as never);
  }
}
