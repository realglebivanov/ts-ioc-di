export interface ResolvedDependency {
    name: string;
    value: any;
}

export type ResolvedDependencyCallback = (dependency: ResolvedDependency) => void;
