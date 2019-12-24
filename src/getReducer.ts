/**
 * 构建models
 * @param models models
 * @param plugins 插件
 */
const getReducers = (models: Array<IModel<any>>, plugins: IStringMap[]) => {
    const rootReducer: IStringMap = {};
    for (const model of models) {
        if (model.state && model.reducers) {
            rootReducer[model.namespace] = (
                state: any = model.state,
                action: { type: string }
            ) => {
                const [namespace, type] = action.type.split('/');
                const reducer = model.reducers && model.reducers[type];
                if (
                    namespace === model.namespace &&
                    !(model.effects && model.effects[type]) &&
                    reducer
                ) {
                    return reducer(state, { ...action, type });
                }
                return state;
            };
        }
    }
    plugins.forEach(item => {
        rootReducer[item.namespace] = item.reducer;
    });
    return rootReducer as any;
};

export default getReducers;
