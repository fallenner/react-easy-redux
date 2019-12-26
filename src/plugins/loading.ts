import { IPlugin } from '../types';

export const SHOW = '@@LOADING/SHOW';
export const HIDE = '@@LOADING/HIDE';

export interface ILoading {
    [propName: string]: boolean;
}

const initState: ILoading = {};

const namespace = 'loading';

const reducer = (state = initState, action: { type: string; key: string }) => {
    const { type, key } = action;
    switch (type) {
        case SHOW:
            return {
                ...state,
                [key]: true
            };
        case HIDE:
            return {
                ...state,
                [key]: false
            };
        default:
            return state;
    }
};

const onEffect = (effect: any, { put }: any, type: string) => {
    return function*(...args: any[]) {
        yield put({ type: SHOW, key: type });
        yield effect(...args);
        yield put({ type: HIDE, key: type });
    };
};

const LoadingPlugin: IPlugin<ILoading> = { namespace, reducer, onEffect };

export default LoadingPlugin;
