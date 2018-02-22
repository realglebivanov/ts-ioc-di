# ts-ioc-di
Typescript IoC container and DI

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

## Pitfalls
- Primitives are not allowed as bindings keys since Service Locator pattern is discouraged
- Interfaces are not allowed as bindings keys since they don't have runtime representation
If you want to use interface, you can use specificated version of decorator with concrete type as its argument or create abstract class with abstract methods only and bind it.
- Method decorated with `@InjectArgs` can accept regular arguments too, but they will be listed after injected args

## Feedback
You can fork this repo and make a pull request or request a feature that you would like to see.
