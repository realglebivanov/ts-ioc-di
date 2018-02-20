import { PropertyMetadata } from './property.metadata';
import { MethodMetadata } from './method.metadata';
import { Class } from '@/class';

export class ClassMetadata<T> {
    private properties: Map<string, PropertyMetadata<T, any>> = new Map();
    private methods: Map<string, MethodMetadata<T>> = new Map();
    private constructorMetadata: MethodMetadata<T>;

    public constructor(private classConstructor: Class<T>) {
        this.constructorMetadata = new MethodMetadata(classConstructor);
    }

    public getProperties(): Array<PropertyMetadata<T, any>> {
        return Array.from(this.properties.values());
    }

    public getMethods(): Array<MethodMetadata<T>> {
        return Array.from(this.methods.values());
    }

    public getConstructor(): MethodMetadata<T> {
        return this.constructorMetadata;
    }

    public addProperty<D>(name: string, type: D): void {
        this.properties.set(name, new PropertyMetadata(this.classConstructor, name, type));
    }

    public addMethod(name: string): void {
        this.methods.set(name, new MethodMetadata(this.classConstructor.prototype, name));
    }
}
