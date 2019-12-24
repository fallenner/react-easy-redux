import * as sagaEffects from 'redux-saga/effects';
import { prefixType } from './util';

/**
 * 所有effects触发的时候执行的方法
 * @param model 触发的effects所在的model
 * @param args action 传参
 */
const onEffectWitchCatch = function*(model: IModel<any>, ...args: any[]) {
    const {
        __my_reject: reject,
        __my_resolve: resolve,
        payload,
        type
    } = args[0];
    const [, key] = type.split('/');
    const catchSelf = payload && payload.catchSelf;
    try {
        if (model.effects) {
            catchSelf && delete payload.catchSelf;
            const ret = yield model.effects[key](
                payload,
                extSagaEffects(model)
            );
            resolve(ret);
        }
    } catch (e) {
        if (catchSelf) {
            reject(e);
        }
    }
};

/**
 *  扩展saga的Effects方法
 * @param model IModel
 */
const extSagaEffects = (model: IModel<any>) => {
    const put = (action: { type: string }) => {
        const { type } = action;
        return sagaEffects.put({
            ...action,
            type: prefixType(model, type)
        });
    };
    return {
        ...sagaEffects,
        put
    };
};

/**
 * 构建sagas
 * @param models models
 * @param pluginOnEffects 扩展saga的插件
 */
const getSagas = function*(
    models: Array<IModel<any>> = [],
    pluginOnEffects: Array<(...args: any[]) => any> = []
) {
    for (const model of models) {
        if (model.effects) {
            for (const key of Object.keys(model.effects)) {
                const type = prefixType(model, key);
                let effectFn = onEffectWitchCatch.bind(null, model);
                for (const fn of pluginOnEffects) {
                    effectFn = fn(effectFn, sagaEffects, type);
                }
                yield sagaEffects.takeEvery(type, effectFn);
            }
        }
    }
};

export default getSagas;
