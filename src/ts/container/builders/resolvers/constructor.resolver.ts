import { Class } from '@/container/class';
import { Container } from '@/container/container';
import { ClassMetadata, ClassDependency } from '@/container/builders/metadata';

export class ConstructorResolver<T> {
    private extraCtorArgsCounter: number = 0;
    private extraCtorArgs: Array<any> = [];

    public constructor(
        private container: Container,
        private concrete: Class<T>,
        private metadata: ClassMetadata<T>
    ) { }

    public createInstance(extraCtorArgs: Array<any>): T {
        this.extraCtorArgs = extraCtorArgs;
        return new this.concrete(...this.resolveCtorDependencies());
    }

    private resolveCtorDependencies(): Array<any> {
        return this.metadata.getCtorDependencies().map(
            (dependency: ClassDependency<any>) => this.resolve(dependency)
        );
    }

    private resolve(dependency: ClassDependency<any>): any {
        return dependency.isInjectableClass() ?
            this.container.resolve(dependency.getClass()) :
            this.extraCtorArgs[this.extraCtorArgsCounter++];
    }
}
