import { Token } from '@/token';

export class ResolutionError<T> extends Error {
  public constructor(public token: Token<T>) {
    super(`Unknown dependency: ${typeof token === 'function' ? token.name : token.toString()}`);
  }
}
