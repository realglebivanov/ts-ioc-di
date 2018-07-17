# ts-ioc-di
Typescript IoC container and DI
[![CircleCI](https://circleci.com/gh/glebivanov816/ts-ioc-di.svg?style=svg)](https://circleci.com/gh/glebivanov816/ts-ioc-di)

# Features
- Constructor injection
- Property injection
- Method injection
- Method/constructor argument injection
- Autowiring

# Dependencies
- Typescript
- Reflect-metadata

# Examples
## tsconfig.json setup
You have to add the following lines to you tsconfig.json
```
    {
        ...,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        ...
    }
```

## Initialization and bindings
```
import { Container } from 'ts-ioc-di';

const container = new Container();

// binds Concrete to container
container.bind(Concrete);
container.bind('concrete', Concrete);
container.bind(Symbol.for('concrete'), Concrete);

// binds Abstract class to its implementation
container.bind(Abstract, Concrete);

// binds Abstract class to its implementation with extra constructor arguments
container.bind(Abstract, Concrete, [1, 10]);

// binds factory for resolving Abstract
container.bindFactory(Abstract, (container: Container) => container.resolve(Concrete));
container.bindFactory('abstract', (container: Container) => container.resolve(Concrete));
container.bindFactory(Symbol.for('abstract'), (container: Container) => container.resolve(Concrete));

// binds Concrete as singleton
container.singleton(Concrete);
container.singleton('concrete', Concrete);
container.singleton(Symbol.for('concrete'), Concrete);

// binds Concrete as singleton implementation of Abstract
container.singleton(Abstract, Concrete);

// binds Concrete as singleton implementation of Abstract with extra constructor arguments
container.singleton(Abstract, Concrete, [1, 2]);

// binds factory of Concrete as singleton implementation of Abstract
container.singletonFactory(Abstract, (container: Container) => container.resolve(Concrete));
container.singletonFactory('abstract', (container: Container) => container.resolve(Concrete));
container.singletonFactory(Symbol.for('abstract'), (container: Container) => container.resolve(Concrete));

// binds instance as implementation of Abstract
container.instance(Abstract, container.resolve(Concrete));
container.instance('abstract', container.resolve(Concrete));
container.instance(Symbol.for('abstract'), container.resolve(Concrete));
```

## Dependency resolution
You should register all your dependencies before trying to resolve them with DI.
Otherwise container will try to resolve unregistered dependency 
and if it won't be injectable `UnknownDependencyError` will be thrown.

If you are using primitives to bind dependencies to container, container can't infer 
resolved dependency type, so you have to pass type of resolved dependency as type argument.

```
import { Container, Injectable } from 'ts-ioc-di';

@Injectable class Test { }

// ...

const container = new Container();
container.bind('test', Test);
container.resolve<Test>('test');
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

### Autowiring

If you want, you can create classes which dependencies are resolved automatically after regular instantiation

```
import { Container, createAutowiredDecorator } from 'ts-ioc-di';

const container = new Container();
const Autowired = createAutowiredDecorator(container);

// ...

@Autowired()
class Authenticator {
  @Inject()
  private users: UserService;
}

// UserService is automatically injected
const authenticator = new Authenticator();
```

#### Autowiring and constructor injection

You can use any type of DI that is described above, but constructor injection is a bit tricky with autowiring.
A following mechanism to control it exists.

```
@Autowired({ useConstructorInjection: true })
class Authenticator {
  public constructor(
    private users: UserService,
    private ...rest: Array<any>
  ) { }
}
```
In this case constructor injection is enabled and other arguments passed to constructor are in the rest.

```
@Autowired({ useConstructorInjection: false })
class Authenticator {
  public constructor(
    private ...rest: Array<any>
  ) { }
}

@Autowired()
class Authenticator {
  public constructor(
    private ...rest: Array<any>
  ) { }
}
```
In these cases arguments passed to constructor are directly forwarded to `Authenticator`.

Default behavior is to not use constructor injection with autowiring, because it may be quite misleading. 

## Low-level API
Low-level api is represented by `InstanceBuilder` and `InstanceBuilderFactory` which will return you an instance of `InstanceBuilder`.

```
import { Container } from 'ts-ioc-di';

const container = new Container();

class UserService { }

// ...

import { InstanceBuilderFactory } from 'ts-ioc-di';

const instanceBuilder = InstanceBuilderFactory.create(UserService, container);
const extraConstructorArguments = [1, 2, 3];

const userService = instanceBuilder
  .createInstance(extraConstructorArguments) // .setProduct(instance)
  .injectProperties()
  .injectMethods()
  .getProduct()

```
As you can see, you can build classes with that API without directly resolving them from container.
This may be useful for integration with libraries or writing your own decorators to extend DI possibilities.

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
container.alias(B, A);
container.alias(C, B);

// Instance of A which was registered before is resolved
container.resolve(C);
```
### Primitives

Strings and symbols are allowed as DI tokens, 
but their usage is not preferred since DI container should not be used as service locator.  

Another option is
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
And then you can use these classes as dependencies for DI
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
