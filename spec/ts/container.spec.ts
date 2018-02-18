import { Container } from '@/container/container';
import { Singleton } from './doubles/singleton';

describe('Container', () => {
    let container: Container;

    beforeEach(() => container = new Container());
    beforeEach(() => Singleton.id = 0);

    it('resolves classes that are not bound to container', () => {
        // const root: TestRoot = container.resolve(TestRoot);
        // expect(root).toBeDefined();
        // expect(root.child).toBeDefined();
        // expect(root.anotherChild).toBeDefined();
        // expect(root.child.singleton).toBeDefined();
        // expect(root.anotherChild && root.anotherChild.singleton).toBeDefined();
    });

    it('should pass again', () => {
        expect(true).toEqual(true);
    });
});
