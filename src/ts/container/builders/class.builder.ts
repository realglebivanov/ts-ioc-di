import { ConstructorResolver, PropertyResolver, Property } from './resolvers';

export class ClassBuilder<T extends {[key: string]: any}> {
    private product?: T;

    public constructor(
        private propertyResolver: PropertyResolver<T>,
        private constructorResolver: ConstructorResolver<T>
    ) { }

    public setProduct(product: T): ClassBuilder<T> {
        this.product = product;
        return this;
    }

    public getProduct(): T {
        return this.product as T;
    }

    public createInstance(extraCtorArgs: Array<any> = []): ClassBuilder<T> {
        this.product = this.constructorResolver.createInstance(extraCtorArgs);
        return this;
    }

    public injectProperties(): ClassBuilder<T> {
        this.propertyResolver.forEachProperty(
            (property: Property) => (<T> this.product)[property.name] = property.value
        );
        return this;
    }
}
