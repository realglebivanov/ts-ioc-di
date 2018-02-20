import { Class } from '@/class';
import { Container } from '@/container';
import { MethodMetadata } from '@/metadata';
import { Dependency } from './dependency';

export class ConstructorResolver<T> {
    private extraCtorArgsCounter: number = 0;
    private extraCtorArgs: Array<any> = [];

    public constructor(
        private container: Container,
        private concrete: Class<T>,
        private metadata: MethodMetadata<T>
    ) { }

    public resolveWith(extraCtorArgs: Array<any>): T {
        this.extraCtorArgs = extraCtorArgs;
        return new this.concrete(...this.resolveCtorDependencies());
    }

    private resolveCtorDependencies(): Array<any> {
        return this.metadata.getDependencies().map(
            (dependency: Dependency<any>) => this.resolve(dependency)
        );
    }

    private resolve(dependency: Dependency<any>): any {
        return dependency.isInjectable() ?
            this.container.resolve(dependency.getClass()) :
            this.extraCtorArgs[this.extraCtorArgsCounter++];
    }
}
