# minprogram-redux

基于小程序的redux分装

## 设计思路

对于小程序的数据保存处理方案，都是采用globalData进行数据的保存

对此，我们设计时，也是参考这样的处理

1. 也是在App中将store注册进入
2. 如果Page或者Component需要使用store，在对应生命周期入口将对应的state引入到data中
3. 将引起state数据变化的方法作为方法注入进去

## 使用说明

对于redux的基本写法，再此不介绍，仅提供一个demo，主要介绍和小程序有关的使用

首先在App中将redux引入 

```js
import { Provider } from 'mingrogram-redux/lib/index'
import { setApp } from 'mingrogram-redux/lib/app'
import store from './redux/store'

App(Provider(store)({
  ...
  // 小程序的代码
}))
```

Page中调用

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
 * stateNeedOptions 如果状态需要使用onLoad的options参数，在stateNeedOptions设置为true
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
