import { Container } from '@/container';
import { Dependency } from './dependency';

export class DependencyResolver {
    private extraArgsCounter: number = 0;

    public constructor(
        private container: Container,
        private dependencies: Array<Dependency<any>>
    ) { }

    public combineDepsWith(extraArgs: Array<any> = []): Array<any> {
        const resolvedDeps = this.combineDeps(extraArgs);
        this.extraArgsCounter = 0;
        return resolvedDeps;
    }

    private combineDeps(extraArgs: Array<any>): Array<any> {
        return this.dependencies.map((dependency: Dependency<any>) =>
            this.resolve(dependency, extraArgs)
        );
    }

    private resolve(dependency: Dependency<any>, extraArgs: Array<any>): any {
        return dependency.isInjectable() ?
            this.container.resolve(dependency.getClass()) :
            extraArgs[this.extraArgsCounter++];
    }
}
