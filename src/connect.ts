import React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});

export interface IEffectPayload {
    /** 是否自己捕捉异常 */
    catchSelf?: boolean;
    /** 是否展示加载loading */
    showLoading?: boolean;
    /** loading文字 */
    loadingText?: string;

    [propName: string]: any;
}

export interface IDisPatchProps {
    /** 转发事件到对应的model的effects or reducer事件 */
    dispatch: (action: {
        type: string;
        payload?: IEffectPayload;
    }) => Promise<any>;

    [propName: string]: any;
}

/**
 * 导出redux组件
 */
export default (
    WrappedComponent: React.ComponentType<IDisPatchProps>,
    mapStateToProps?: any
) => {
    return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};
