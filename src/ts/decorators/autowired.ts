import { AutowiredBuilder, DecoratorFactory } from '@/builders';

export const createAutowiredDecorator: DecoratorFactory = new AutowiredBuilder().getDecoratorFactory();
