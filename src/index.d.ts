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

export interface IModel<S> {
    namespace: string;
    effects?: IEffectsMap;
    state?: S;
    reducers?: IReducersMap<S>;
}

declare const getStore: <T>(models: Array<IModel<any>>) => any;

export interface IEffectPayload {
    /** 是否自己捕捉异常 */
    catchSelf?: boolean;
    /** 是否展示加载loading */
    showLoading?: boolean;
    /** loading文字 */
    loadingText?: string;

    [propName: string]: any;
}

/** 转发事件到对应的model的effects or reducer事件 */
declare type IDisPatchProps = (action: {
    type: string;
    payload?: IEffectPayload;
}) => Promise<any>;

/** 把组件连接到easy-redux */
declare const connect: (
    WrappedComponent: React.ComponentType<any>,
    mapStateToProps?: any
) => React.ComponentType;
