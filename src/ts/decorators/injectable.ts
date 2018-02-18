import { Class } from '@/container/class';

export function Injectable<I, C extends Class<I>>(ctor: C): C {
    return Object.assign(ctor, {injectable: true});
}
