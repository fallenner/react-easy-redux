interface IEffectPut {
    type: string;
    [propName: string]: any;
}
interface IEffectsMap {
    [key: string]: (
        payload: any,
        effects: {
            put: (action: IEffectPut) => void;
            call: (fn: (...args: any) => any, ...args: any) => any;
            select<Fn extends (state: any, ...args: any[]) => any>(
                selector: Fn,
                ...args: any
            ): any;
        }
    ) => void;
}

interface IReducersMap<T> {
    [key: string]: (state: T, payload: any) => T;
}

declare interface IModel<S> {
    namespace: string;
    effects?: IEffectsMap;
    state?: S;
    reducers?: IReducersMap<S>;
}

declare interface IStringMap<T = any> {
    [key: string]: T;
}
