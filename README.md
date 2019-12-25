# react-easy-redux

一个对 redux、redux-saga 做了简易封装的插件。可用直接用于 React 、React-Native。

## 背景

因为直接使用 redux + redux-saga 对新手很不友好。 特别是 redux-saga ,很多新手对其一头雾水。受 [dva.js](https://dvajs.com/) 启发（感觉 dva 太庞大，特别是运用在 react-native 太庞大,影响性能），造了这个插件....

## Getting Started

### Installation

```bash
npm i react-easy-redux --save
```

### Basic Usage

```tsx
import { Modal } from 'react-native';
import { Provider, getStore,connect } from 'react-easy-redux';

const model = {
    namespace:'test',
    state:{
        msg:'hello,world'
    },
    effects:{
        *fetch(payload,{call,put}) {
            const response = yield call(fetchApi,payload);
            yield put({
                type: 'save',
                payload: {
                    msg:response
                }
            })
        }
    },
    reducers:{
         save(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
    }
};

// 初始化store
const store = getStore([model]);



export default class App extends React.Component {
    render: function() {
        return (
           <Provider store={store}>
              <div>hello,world</div>
           </Provider>
        )
    }
}

// 展示组件里使用
const Test = (props) => {
    return (
        <div>{props.msg}</div>
    )
}

const mapStateToProps = ({test}) => ({
    msg: test.msg
})

export const ConnectTest = connect(Test,mapStateToProps);

```

### API

#### Model

| propName  |  type  | required |                              desc                               |
| :-------: | :----: | :------: | :-------------------------------------------------------------: |
| namespace | string |   true   |                  最终注入到 reducer 里的模块名                  |
|   state   | object |   true   |                  注入的 reducer 模块里的 state                  |
|  effects  | object |  false   | 注入到 redux-saga 里的 effects，可以使用 call、put、select 方法 |
| reducers  | object |  false   |              变更该模块 state 的值的 reducer 方法               |

#### connect

将 react 组件注入到 redux 中的方法，在 react-redux 的基础上简化的，会自动注入 dispatch 方法到组件里。

```tsx
const Test = props => {
    return <div>{props.msg}</div>;
};

const mapStateToProps = ({ test }) => ({
    msg: test.msg
});

export const ConnectTest = connect(Test, mapStateToProps);
```

#### dispatch

connect 后的组件会有的方法，用于触发对应的 effects 方法。返回一个 Promise，触发的 effects 方法在使用前会触发对应的 loading = true，执行完后 loading = false

```javascript
this.props.dispatch({
    type: 'namespace/effectFunctionName',
    payload: {
        a: 1,
        b: 1,
        catchSelf: false
    }
});
```

dispatch 有一些参数用于满足一些灵活的需求，参数如下:

|   name    |  type   | required |                                                  desc                                                  |
| :-------: | :-----: | :------- | :----------------------------------------------------------------------------------------------------: |
| catchSelf | boolean | false    | 默认值为 false，如果设为 true，触发的 effect 方法的异常会抛出，需要 dispatch 返回的 promise 自己 catch |

#### loading

自带 loading 插件，每次触发的 effect 方法，会自动在 redux 的 state 生成一个 loading 变量，用于在异步请求加载 Loading。

```jsx
const Test = props => {
    useEffect(() => {
        props.dispatch({
            type: 'test/aFun'
        });
    });
    return <div>{props.testLoading}</div>;
};

const mapStateToProps = ({ test,loading }) => ({
    msg: test.msg，
    testLoading:loading['test/aFun']
});

export const ConnectTest = connect(Test, mapStateToProps);
```

## Next

1. 支持自定义插件,支持自定义 loading 组件，在触发 effects 方法，通过参数直接加载 loading 组件效果。

## Other

第一次发布 npm 包，肯定有诸多不足，欢迎 PR。

## License

[MIT](http://opensource.org/licenses/MIT)

Create By daizq
