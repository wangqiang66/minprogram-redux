//app.js
import { Provider } from 'minprogram-redux/lib/index'
import { setApp } from 'minprogram-redux/lib/app'
import store from './redux/store'

App(Provider(store)({
}))
