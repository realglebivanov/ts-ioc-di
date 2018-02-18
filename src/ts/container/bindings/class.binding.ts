import { Binding } from './binding';
import { Class } from '@/container/class';
import { Container } from '@/container/container';
import { ClassBuilderFactory, ClassBuilder } from '@/container/builders';

export class ClassBinding<T> implements Binding<T> {
    public constructor(
        private abstract: Class<T>,
        private concrete: Class<T> = abstract,
        private extraCtorArgs: Array<any> = []
    ) { }

    public getClass(): Class<T> {
        return this.abstract;
    }

    public resolve(container: Container): T {
        return this.getClassBuilder(container)
            .createInstance(this.extraCtorArgs)
            .injectProperties()
            .getProduct();
    }

    private getClassBuilder(container: Container): ClassBuilder<T> {
        return ClassBuilderFactory.create(this.concrete, container);
    }
}
