import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createPromiseMiddleware from './middleware/promise';
import loadingPlugin, { ILoading } from './plugins/loading';
import getSagas from './getSagas';
import getReducers from './getReducer';
import easyConnect from './connect';

export interface IRootState {
    loading: ILoading;
}

export { Provider } from 'react-redux';

export const getStore = (models: Array<IModel<any>>) => {
    const plugins = [loadingPlugin];

    const rootSaga = getSagas.bind(
        null,
        models,
        plugins.map(item => item.onEffect)
    );

    const rootReducers = getReducers(models, plugins);

    const sagaMiddleware = createSagaMiddleware();

    const promiseMiddleware = createPromiseMiddleware(models);

    sagaMiddleware.run(rootSaga as any);

    return createStore(
        combineReducers<IRootState>(rootReducers),
        applyMiddleware(promiseMiddleware, sagaMiddleware)
    );
};

/**
 * 把组件关联到redux
 */
export const connect = easyConnect;
