import { Store } from 'redux';

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

/** 初始化easy-redux的时候调用的方法 */
declare const getStore: <T>(models: Array<IModel<any>>) => Store;

export interface IEffectPayload {
    /** 是否自己捕捉异常 */
    catchSelf?: boolean;
    // /** 是否展示加载loading,暂不支持 */
    // showLoading?: boolean;
    // /** loading文字，暂不支持 */
    // loadingText?: string;

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
) => React.ComponentType;
