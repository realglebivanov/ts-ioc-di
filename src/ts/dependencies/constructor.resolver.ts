import { Class } from '@/class';
import { Container } from '@/container';
import { ConstructorMetadata } from '@/metadata';
import { DependencyResolver } from './dependency.resolver';

export class ConstructorResolver<T> {
    public constructor(
        private container: Container,
        private concrete: Class<T>,
        private metadata: ConstructorMetadata<T>
    ) { }

    public resolveWith(extraCtorArgs: Array<any>): T {
        return new this.concrete(...this.resolveCtorDependencies(extraCtorArgs));
    }

    private resolveCtorDependencies(extraCtorArgs: Array<any>): Array<any> {
        return this.getDependencyResolver().combineDepsWith(extraCtorArgs);
    }

    private getDependencyResolver(): DependencyResolver {
        return new DependencyResolver(this.container, this.metadata.getDependencies());
    }
}
