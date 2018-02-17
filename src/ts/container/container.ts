import { Token } from '@/container/builders';
import { Class } from '@/container/class';

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

    public resolve<T>(token: Token<T>): T {
        let foundBinding = this.bindings.get(token.getSource());
        foundBinding = foundBinding || new ClassBinding(token.getSource());
        return foundBinding.resolve(this);
    }

    public instance<T>(abstract: Class<T>, instance: T): void {
        this.register(new ValueBinding(abstract, instance));
    }

    public singleton<T>(abstract: Class<T>, concrete?: Class<T>, args?: Array<any>): void {
        this.register(new SingletonBinding(new ClassBinding(abstract, concrete, args)));
    }

    public singletonFactory<T>(abstract: Class<T>, factory: Factory<T>): void {
        this.register(new SingletonBinding(new FactoryBinding(abstract, factory)));
    }

    public bind<T>(abstract: Class<T>, concrete?: Class<T>, args?: Array<any>): void {
        this.register(new ClassBinding(abstract, concrete, args));
    }

    public bindFactory<T>(abstract: Class<T>, factory: Factory<T>): void {
        this.register(new FactoryBinding(abstract, factory));
    }

    private register<T>(binding: Binding<T>): void {
        this.bindings.set(binding.getToken().getSource(), binding);
    }
}
