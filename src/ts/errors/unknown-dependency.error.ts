import { Token } from '@/token';

export class UnknownDependencyError<T> extends Error {
  public constructor(public token: Token<T>) {
    super(`Unknown dependency: ${token instanceof Function ? token.name : token.toString()}`);
  }
}
