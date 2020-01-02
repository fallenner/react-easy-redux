import { Store } from 'redux';
import { Effect } from 'redux-saga/effects';

export interface IStringMap {
    [propName: string]: any;
}

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
    /** 在reducer里的模块名 */
    namespace: string;

    /** 在reducer里的模块名 */
    effects?: IEffectsMap;

    /** 对应redux-saga里的effects方法 */
    state?: S;

    /** 对应的reducer模块里的方法 */
    reducers?: IReducersMap<S>;
}

/** 自定义组件 */
export interface IPlugin<S> {
    /** 在reducer里的模块名 */
    namespace: string;
    /** 对应的reducer方法 */
    reducer: (state: S, action: any) => S;

    /** 对应的effect拦截器 */
    onEffect: (
        effect: any,
        sagaEffects: Effect,
        type: string
    ) => (...args: any[]) => Generator<any, void, unknown>;
}

/** 初始化easy-redux的时候调用的方法 */
export const getStore: <T>(
    models: Array<IModel<any>>,
    plugins?: Array<IPlugin<any>>
) => Store;

export interface IEffectPayload {
    /** 是否自己捕捉异常 */
    catchSelf?: boolean;
    [propName: string]: any;
}

/** 转发事件到对应的model的effects or reducer事件 */
export type IDisPatchProps = (action: {
    type: string;
    payload?: IEffectPayload;
}) => Promise<any>;

/** 从react-redux直接导出Provider */
export { Provider } from 'react-redux';

/** 把组件连接到easy-redux */
export const connect: (
    WrappedComponent: React.ComponentType<any>,
    mapStateToProps?: any
) => React.ComponentType<any>;
