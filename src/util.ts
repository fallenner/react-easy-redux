/**
 * 格式化type
 * @param model model
 * @param type dispatch的type
 */
export const prefixType = (model: IModel<any>, type: string) => {
    const typeArr = type.split('/');
    if (typeArr.length > 1) {
        return type;
    } else {
        return `${model.namespace}/${type}`;
    }
};
