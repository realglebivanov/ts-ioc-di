import {
    ConstructorResolver,
    PropertyResolver,
    MethodResolver,
    Property
} from '@/dependencies';

import { Dictionary } from '@/dictionary';

export class ClassBuilder<T extends Dictionary> {
    private product?: T;

    public constructor(
        private methodResolver: MethodResolver<T>,
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
        this.product = this.constructorResolver.resolveWith(extraCtorArgs);
        return this;
    }

    public injectProperties(): ClassBuilder<T> {
        this.propertyResolver.resolveAll((property: Property<any>) => {
            (<T> this.product)[property.name] = property.value;
        });
        return this;
    }

    public injectMethods(): ClassBuilder<T> {
        this.methodResolver.resolveDependencies();
        return this;
    }
}
