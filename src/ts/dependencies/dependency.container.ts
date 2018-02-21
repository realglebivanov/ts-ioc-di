import { Class } from '@/class';
import { Dictionary } from '@/dictionary';
import { Dependency } from '@/dependencies';

export type MethodName = string | undefined;

export class DependencyContainer<T> {
    private overrides: Map<MethodName, Dictionary> = new Map();

    public constructor(
        private target: Class<T>
    ) { }

    public addMethodOrConstructorDependency<D>(method: MethodName, argIndex: number, type: D): void {
        this.overrides.set(method, {...this.getOverridenTypes(method), [argIndex]: type});
    }

    public getMethodOrConstructorDependencies(method?: string): Array<Dependency<any>> {
        const realTarget = method ? this.target.prototype : this.target;
        const reflectedTypes = this.getReflectedTypes(realTarget, method);
        const paramTypes = this.getParametersTypes(method, reflectedTypes);
        return paramTypes.map((type: any) => new Dependency(type, method));
    }

    private getReflectedTypes(target: Class<T> | T, method: MethodName): Array<any> {
        return Reflect.getOwnMetadata('design:paramtypes', target, method as string) || [];
    }

    private getParametersTypes(method: MethodName, reflectedTypes: Array<any>): Array<any> {
        return reflectedTypes.reduce((result: Array<any>, current: any, i: number) => {
            return [...result, this.getOverridenTypes(method)[i] || current];
        }, []);
    }

    private getOverridenTypes(method: MethodName): Dictionary {
        return this.overrides.get(method) || {};
    }
}
