import { Class } from '@/container/class';
import { Container } from '@/container/container';
import { ClassMetadata, ClassDependency } from '@/container/builders/metadata';

export class ConstructorResolver<T> {
    private ctorArgsCounter: number = 0;
    private customCtorArgs: Array<any>;
    private metadata: ClassMetadata<T>;
    private concrete: Class<T>;
    private container?: Container;

    public constructor(concrete: Class<T>, customCtorArgs: Array<any>) {
        this.concrete = concrete;
        this.metadata = new ClassMetadata(concrete);
        this.customCtorArgs = customCtorArgs;
    }

    public setContainer(container: Container): void {
        this.container = container;
    }

    public createInstance(): T {
        return new this.concrete(...this.resolveCtorDependencies());
    }

    private resolveCtorDependencies(): Array<any> {
        return this.metadata.getCtorDependencies().map(
            (dependency: ClassDependency<any>) => this.resolve(dependency)
        );
    }

    private resolve(dependency: ClassDependency<any>): any {
        return dependency.isInjectableClass() ?
            (<Container> this.container).resolve(dependency.getToken()) :
            this.customCtorArgs[this.ctorArgsCounter++];
    }
}
