import { Class } from '@/container/class';
import { Container } from '@/container/container';

import { ConstructorResolver, PropertyResolver, Property } from './resolvers';

export class ClassBuilder<T extends {[key: string]: any}> {
    private product?: T;
    private propertyResolver: PropertyResolver<T>;
    private constructorResolver: ConstructorResolver<T>;

    public constructor(concrete: Class<T>, ctorArgs: Array<any>) {
        this.propertyResolver = new PropertyResolver(concrete);
        this.constructorResolver = new ConstructorResolver(concrete, ctorArgs);
    }

    public setProduct(product: T): ClassBuilder<T> {
        this.product = product;
        return this;
    }

    public getProduct(): T {
        return this.product as T;
    }

    public setContainer(container: Container): ClassBuilder<T> {
        this.propertyResolver.setContainer(container);
        this.constructorResolver.setContainer(container);
        return this;
    }

    public createInstance(): ClassBuilder<T> {
        this.product = this.constructorResolver.createInstance();
        return this;
    }

    public injectPropertyDependencies(): ClassBuilder<T> {
        this.propertyResolver.forEachProperty(
            (property: Property) => (<T> this.product)[property.name] = property.value
        );
        return this;
    }
}
