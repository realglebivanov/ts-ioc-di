# ts-ioc-di
Typescript IoC container and DI
[![CircleCI](https://circleci.com/gh/glebivanov816/ts-ioc-di.svg?style=svg)](https://circleci.com/gh/glebivanov816/ts-ioc-di)

# About
This container can be used to create full graphs of objects using it's features.
Dependencies are resolved recursively and are resolved even if they are not explicitly bound to container.

# Features
- Constructor injection
- Property injection
- Method injection
- Method/constructor argument injection

# Dependencies
- Typescript (DI is implemented with typescript types metadata as a dependency)
- Reflect-metadata

# Examples
## Initialization and bindings
```
import { Container } from 'ts-ioc-di';

const container = new Container();

// binds Concrete to container
container.bind(Concrete);

// binds Abstract class to its implementation
container.bind(Abstract, Concrete);

// binds Abstract class to its implementation with extra constructor arguments
container.bind(Abstract, Concrete, [1, 10]);

// binds factory for resolving Abstract
container.bindFactory(Abstract, (container: Container) => container.resolve(Concrete));

// binds Concrete as singleton
container.singleton(Concrete);

// binds Concrete as singleton implementation of Abstract
container.singleton(Abstract, Concrete);

// binds Concrete as singleton implementation of Abstract with extra constructor arguments
container.singleton(Abstract, Concrete, [1, 2]);

// binds factory of Concrete as singleton implementation of Abstract
container.singletonFactory(Abstract, (container: Container) => container.resolve(Concrete));

// binds instance as implementation of Abstract
container.instance(Abstract, container.resolve(Concrete));
```

## Dependency injection
DI is implemented with decorators
```
import { Injectable, Inject, InjectArg, InjectArgs } from 'ts-ioc-di';
```
All classes that should be resolved with DI must be decorated with `@Injectable`
```
@Injectable
class UserRepository { }
```
### Constructor injection
```
// users property will be auto-injected

@Injectable
class Authenticator {
  public constructor(
    private users: UserRepository
  ) { }
}
```
#### Constructor injection with argument injection
```
interface Repository { }

// ...

@Injectable
class Authenticator {
  public constructor(
    @InjectArg(UserRepository) private users: Repository
  ) { }
}
```

### Property injection
```
@Injectable class UserRepository { }

// ...

class Authenticator {
  @Inject()
  private users?: UserRepository;
}
```
#### Property injection with injected class specification

```
interface Repository { }

// ...

@Injectable class UserRepository implements Repository { }

// ...

class Authenticator {
  @Inject(UserRepository)
  private users?: Repository;
}
```

### Method injection
```
class ViewModel {
  @InjectArgs()
  public created(handler: CreatedHandler): void {
    handler.onEvent(this);
  }
}
```
#### Method injection with argument injection
```
interface EventHandler { }

// ...

@Injectable class CreatedHandler implements EventHandler { }

// ...

class ViewModel {
  @InjectArgs()
  public created(@InjectArg(CreatedHandler) handler: EventHandler): void {
    handler.onEvent(this);
  }
}
```

## Low-level API
Low-level api is represented by `ClassBuilder` and `ClassBuilderFactory` which will return you an instance of `ClassBuilder`.

```
import { Container } from 'ts-ioc-di';

const container = new Container();

class UserService { }

// ...

import { ClassBuilderFactory } from 'ts-ioc-di';

const classBuilder = ClassBuilderFactory.create(UserService, container);
const extraConstructorArguments = [1, 2, 3];

const userService = classBuilder
  .createInstance(extraConstructorArguments) // .setProduct(instance)
  .injectProperties()
  .injectMethods()
  .getProduct()

```
As you can see, you can build classes with that API without directly resolving them from container.
This is useful for [integration with libraries](https://github.com/glebivanov816/vue-ts-ioc).

## Extra
### Aliases
If you want to use one class as alias for another - you are welcome.
```
import { Container, Injectable } from 'ts-ioc-di';

@Injectable class A { }
@Injectable class B { }
@Injectable class C { }

const container = new Container();

// This is how aliases are registered
container.instance(A, new A());
container.bind(B, A);
container.bind(C, B);

// Instance of A which was registered before is resolved
container.resolve(C);
```
### Primitives
If you really want to bind a primitive value to container, you have the following option
```
import { Container, Injectable } from 'ts-ioc-di';

@Injectable class SomeImportantToken extends String { }

const container = new Container();

container.instance(SomeImportantToken, 'VALUE');
```
You can use the same trick with, e.g. `Number`
```
@Injectable class VeryImportantNumber extends Number { }

container.instance(VeryImportantNumber, Math.random());
```
And then you can use these `class-tokens` as dependencies for DI
```
@Injectable
class Test {
  public constructor(
    private token: SomeImportantToken,
    private number: SomeImportantNumber
  ) { }
}
```

### Interfaces
If you want to bind an interface, you can't - there are no interfaces at runtime.
```
interface Service { }
class UserService implements Service {}

// Error: Service only refers to a type but is being used as a value here.
container.bind(Service, UserService);
```
You should use abstract classes instead of them.
```
abstract class Service { }
class UserService extends Service {}

// Works!
container.bind(Service, UserService);
```
### Argument injection
Methods which are decorated with `@InjectArgs` can accept regular arguments too.
```
class ViewModel {
  // otherArg and otherArgs are listed after injected arguments
  @InjectArgs()
  public created(handler?: CreatedHandler, otherArg: any, ...otherArgs: Array<any>): void {
    handler.onEvent(this);
  }
}
```

### Memento
If you need to manipulate with particular states of container, you can use memento for it.
```
const container = new Container();

container.bind(Abstract, Concrete);

// Internal state is saved into memento
const memento = container.save();

container.unbind(Abstract);
container.restore(memento);

// Internal state is restored, so Abstract can be resolved 
container.resolve(Abstract);
```

## Feedback
You can fork this repo and make a pull request or request a feature that you would like to see.
