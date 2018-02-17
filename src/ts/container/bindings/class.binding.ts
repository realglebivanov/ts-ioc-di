import { Binding } from './binding';
import { Class } from '@/container/class';
import { Container } from '@/container/container';
import { ClassBuilder, Token } from '@/container/builders';

export class ClassBinding<T> implements Binding<T> {
    private abstract: Class<T>;
    private classBuilder: ClassBuilder<T>;

    public constructor(abstract: Class<T>, concrete: Class<T> = abstract, args: Array<any> = []) {
        this.abstract = abstract;
        this.classBuilder = new ClassBuilder(concrete, args);
    }

    public getToken(): Token<T> {
        return new Token(this.abstract);
    }

    public resolve(container: Container): T {
        return this.classBuilder.setContainer(container)
            .createInstance()
            .injectPropertyDependencies()
            .getInstance();
    }
}
