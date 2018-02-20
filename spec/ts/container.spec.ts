import { expect, assert } from 'chai';

import { Container } from '@/container';
import { Root, Child, Singleton, Descendant } from './fixtures';

describe(Container.name, function () {
    const container: Container = new Container();

    beforeEach(() => container.flush());

    it('resolves not bound classes', function () {
        const root: Root = container.resolve(Root);
        assert.instanceOf(root, Root);
        assert.instanceOf(root.child, Child);
        assert.instanceOf(root.child.singleton, Singleton);
        assert.instanceOf(root.singleton, Singleton);
    });

    it('binds singletons', function () {
        container.singleton(Singleton);
        const root: Root = container.resolve(Root);
        const anotherRoot: Root = container.resolve(Root);
        expect(root.singleton).to.equal(anotherRoot.singleton);
    });

    it('binds abstracts to concretes', function () {
        container.bind(Root, Descendant);
        const root: Root = container.resolve(Root);
        assert.instanceOf(root, Descendant);
    });

    it('binds factories', function () {
        container.bindFactory(Root, (container: Container) => container.resolve(Descendant));
        const root: Root = container.resolve(Root);
        assert.instanceOf(root, Descendant);
    });

    it('binds singleton factories', function () {
        container.singletonFactory(Singleton, () => new Singleton());
        const singleton: Singleton = container.resolve(Singleton);
        const anotherSingleton: Singleton = container.resolve(Singleton);
        expect(singleton).to.equal(anotherSingleton);
    });

    it('binds instances', function () {
        container.instance(Root, container.resolve(Descendant));
        const firstInstance: Root = container.resolve(Root);
        const secondInstance: Root = container.resolve(Root);
        assert.instanceOf(firstInstance, Root);
        expect(firstInstance).to.equal(secondInstance);
    });

    it('injects dependencies in methods', function () {
        const root: Root = container.resolve(Root);
        assert.instanceOf(root.test(), Singleton);
    });
});
