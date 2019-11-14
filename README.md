# minprogram-redux

基于小程序的redux分装

## 设计思路

对于小程序的数据保存处理方案，都是采用globalData进行数据的保存

对此，我们设计时，也是参考这样的处理

1. 也是在App中将store注册进入
2. 如果Page或者Component需要使用store，在对应生命周期入口将对应的state引入到data中
3. 将引起state数据变化的方法作为方法注入进去

## 使用说明

1. 在项目使用中只需要在package.json中依赖@ddjf/minprogram-redux就可以了，不需要重新依赖redux等
```json
"dependencies": {
  "@ddjf/minprogram-redux": "^1.0.9"
}
```

2. redux常规写法一样写action、type、redux
- 对于redux的combineReducers直接使用"@ddjf/minprogram-redux"里面的
  ```js
    import { combineReducers } from '@ddjf/minprogram-redux/index'
    import * as common from './modules/common'
    
    export default combineReducers({ ...common })
  ```
- 创建store，可以使用@ddjf/minprogram-redux里面的createStore
```
import { createStore } from '@ddjf/minprogram-redux'
import reducer from './reducers/index'

const preState = {} // preState可以不传，只能只是表示可以加这个参数
export default createStore(reducer, preState)
```

3. 在App中将redux引入 
```js
import { Provider } from 'mingrogram-redux/lib/index'
import store from './redux/store'

App(Provider(store)({
  ...
  // 小程序的代码
}))
```

4. Page中调用

```js
import { connect } from 'mingrogram-redux/lib/index'

const mapStateToData = state => ({
  search: state.search.search,
  cityList: state.user.branchList.map(item => {
    return { ...item, key: item.companyCode, name: item.cityName }
  })
})

const mapDispatchToPage = (dispatch, state) => ({
  setSearchWord: (search) => dispatch(searchUpdate(search))
})

const stateNeedOptions = false

/**
 * mapStateToData: Function(state, options) 需要用到的state数据
 * mapDispatchToPage Function 需要调用的redux更新状态
 * stateNeedOptions 如果状态需要使用onLoad的options参数，在stateNeedOptions设置为false 
 *   由于小程序是启动的时候将所有的页面的初始化都加载了，所以这个值只能为false，设置true，初始化的数据不会更新
 */
Page(connect(mapStateToData, mapDispatchToPage, stateNeedOptions)({
  ...
  // 小程序的Page
}))
```
## 遇到问题

1. 微信小程序不支持process.env环境变量，对于redux需要去掉process.env相关的代码，或者用webpack打包（webpack打包在下个项目的文档中介绍）
2. 微信的视图渲染不是在onReady之后，在运行Page的时候一起运行了，所以在onLoad里面添加data数据不会处理渲染，需要使用setData。但是这样会
   渲染两边，对此，我的处理方式对于state不需要onLoad的option数据时（绝大部分时不需要的），可以启动的时候就将需要的数据渲染进来，数据变
   化的监听放在onLoad中

## 不足

1. 因为项目长列表用的不多，对于数据的比较更新没有使用splicedData（支付宝小程序）

