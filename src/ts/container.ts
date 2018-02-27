import { Class } from './class';

import {
    Binding,
    ValueBinding,
    SingletonBinding,
    ClassBinding,
    Factory,
    FactoryBinding
} from './bindings';

export class Container {
    private bindings: Map<Class<any>, Binding<any>> = new Map();

    public flush(): void {
        this.bindings.clear();
    }

    public resolve<T>(abstract: Class<T>): T {
        let foundBinding = this.bindings.get(abstract);
        foundBinding = foundBinding || new ClassBinding(abstract);
        return foundBinding.resolve(this);
    }

    public instance<T, D extends T>(abstract: Class<T>, instance: D): void {
        this.register(new ValueBinding(abstract, instance));
    }

    public singleton<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void {
        this.register(new SingletonBinding(new ClassBinding(abstract, concrete, args)));
    }

    public singletonFactory<T, D extends T>(abstract: Class<T>, factory: Factory<D>): void {
        this.register(new SingletonBinding(new FactoryBinding(abstract, factory)));
    }

    public bind<T, D extends T>(abstract: Class<T>, concrete?: Class<D>, args?: Array<any>): void {
        this.register(new ClassBinding(abstract, concrete, args));
    }

    public bindFactory<T, D extends T>(abstract: Class<T>, factory: Factory<D>): void {
        this.register(new FactoryBinding(abstract, factory));
    }

    private register<T>(binding: Binding<T>): void {
        this.bindings.set(binding.getClass(), binding);
    }
}
