import { Middleware } from 'redux';
import { IModel } from '../types';

const createPromiseMiddleware = (models: Array<IModel<any>>): Middleware => {
    const middleware: Middleware = () => next => action => {
        const { type } = action;
        const typeArr = type.split('/');
        if (typeArr.length > 1) {
            const [namespace, key] = typeArr;
            const model = models.filter(m => m.namespace === namespace)[0];
            if (model && model.effects && model.effects[key]) {
                return new Promise((resolve, reject) => {
                    next({
                        __my_resolve: resolve,
                        __my_reject: reject,
                        ...action
                    });
                });
            } else {
                return next(action);
            }
        } else {
            return next(action);
        }
    };
    return middleware;
};

export default createPromiseMiddleware;
