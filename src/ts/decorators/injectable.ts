import { Class } from '@/container/class';

export function Injectable<V, K extends Class<V>>(ctor: K) {
    return Object.assign(ctor, {injectable: true});
}
