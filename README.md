# react-easy-redux

English | [中文版](./README_CN.md)

A plugin that simply encapsulates redux and redux-saga. It can be used directly for React 、React-Native

## Notice

<font  size=4>This package depend on redux、redux-saga 、react-redux，So you no need install them additionally !!!!</font>

## Feature

1. Easier integration of redux, redux-saga. if you install this package,You don't need to install redux、redux-saga、react-redux additionally.

2. Automatically define a loading variable in the redux state when you trigger a effect function. Support for custom Plugin.

## Background

redux + redux-saga directly is not friendly to novices. Especially redux-saga, many novices are confused about it.

It inspired by [dva.js](https://dvajs.com/), Why not use dva.js directly ?

Because it is too large, contains many features that are not needed for small and medium projects, and cannot be used directly in React-Native.

## Getting Started

### Installation

```bash
npm i react-easy-redux --save
```

### Basic Usage

```tsx
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

// init store
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

// connect Component
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

| propName  |  type  | required |                                            desc                                            |
| :-------: | :----: | :------: | :----------------------------------------------------------------------------------------: |
| namespace | string |   true   |            The name of the module that was eventually injected into the reducer            |
|   state   | object |   true   |                    State injected into the corresponding reducer module                    |
|  effects  | object |  false   | Effects injected into redux-saga, you can use effects methods like call、 put and so on... |
| reducers  | object |  false   |                            Reducer calculation method in redux                             |

#### connect

The method for injecting react components into redux is simplified on the basis of react-redux, and it automatically injects dispatch methods into components.

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

The component after connect will have methods to trigger the corresponding effects methods. Returns a Promise. The triggered effects method will trigger the corresponding loading = true before use, and loading = false after execution.

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

Parameters of the dispatch method

|   name    |  type   | required |                                                                          desc                                                                           |
| :-------: | :-----: | :------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
| catchSelf | boolean | false    | Defaults false，If set to true, the exception of the triggered effect method will be thrown, and the promise returned by dispatch needs to catch itself |

#### loading

Comes with a loading plugin. Each time the effect method is triggered, a loading variable is automatically generated in the state of redux for loading in exec asynchronous method.

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

No

## Other

Welcome PR!!!! The first release of the npm package must have many shortcomings.

## License

[MIT](http://opensource.org/licenses/MIT)

Create By daizq
