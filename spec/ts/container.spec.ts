import { assert, expect } from 'chai';

import { Container } from '@/container';
import {
  AnotherStringToken,
  Child,
  Descendant,
  MockService,
  Root,
  Singleton,
  StringToken,
  AutowiredClass,
  PrimitiveTest,
  container
} from './fixtures';

describe('Container', function () {
  beforeEach(() => container.unbindAll());

  it('doesnt resolve not bound primitives', function () {
    expect(() => container.resolve('RandomString'))
      .to.throw(Error)
      .with.property('token', 'RandomString');
  });

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

  it('injects decorated arguments', function () {
    const child: Child = container.resolve(Child);
    assert.instanceOf(child.s1, MockService);
    assert.instanceOf(child.serviceTest(), MockService);
  });

  it('binds primitives to container', function () {
    const expected = 'EXPECTED_SUPPORTS_PRIMITIVES';
    container.instance(StringToken, expected);
    expect(container.resolve(StringToken)).to.equal(expected);
  });

  it('binds aliases to container', function () {
    const expected = 'EXPECTED_SUPPORTS_ALIASES';
    container.instance(StringToken, expected);
    container.alias(AnotherStringToken, StringToken);
    expect(container.resolve(AnotherStringToken)).to.equal(expected);
  });

  it('uses memento to save/restore internal state', function () {
    const expected = 'EXPECTED_SUPPORTS_MEMENTO';
    container.instance(StringToken, expected);
    const memento = container.save();

    container.unbind(StringToken);
    assert.isFalse(container.isBound(StringToken));

    container.restore(memento);
    expect(container.resolve(StringToken)).to.equal(expected);
  });

  it('resolves autowired classes', function () {
    const autowiredClassInstance = new AutowiredClass();
    assert.isTrue(Reflect.getMetadata('works', AutowiredClass.prototype, 'test'));
    assert.isFalse(Reflect.getMetadata('doesntWork', AutowiredClass, 'test'));
    assert.instanceOf(autowiredClassInstance, AutowiredClass);
    assert.instanceOf(autowiredClassInstance.singleton, Singleton);
    assert.instanceOf(autowiredClassInstance.singleton2, Singleton);
  });

  it('resolves dependencies bound with primitives', function () {
    container.instance('test', container.resolve(Root));
    container.alias(Symbol.for('test'), 'test');
    assert.instanceOf(container.resolve<Root>('test'), Root);
    assert.instanceOf(container.resolve<Root>(Symbol.for('test')), Root);
  });

  it('resolves dependencies bound with primitives using decorators', function () {
    container.singleton('singleton', Singleton);
    const primitiveTest = container.resolve(PrimitiveTest);
    assert.instanceOf(primitiveTest.s1, Singleton);
    expect(primitiveTest.s1).to.equal(primitiveTest.s2);
  });
});
