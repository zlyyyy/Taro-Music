import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import configStore from './store'
import Index from './pages/index'

import './app.scss'

const store = configStore()

class App extends Component {
    config = {
        pages: [
        'pages/index/index',
        'pages/search/search',
        'pages/library/library',
        'pages/me/me'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'Test',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: "#6D6E6F",
            selectedColor: "#FF3B42",
            backgroundColor: "#FFFFFF",
            borderStyle: "black",
            list: [{
                pagePath: "pages/index/index",
                text: "首页",
                iconPath: "./asset/images/index.png",
                selectedIconPath: "./asset/images/index_focus.png"
            },{
                pagePath: "pages/search/search",
                text: "搜索",
                iconPath: "./asset/images/search.png",
                selectedIconPath: "./asset/images/search_focus.png"
            }, {
                pagePath: "pages/library/library",
                text: "音乐库",
                iconPath: "./asset/images/library.png",
                selectedIconPath: "./asset/images/library_focus.png"
            }, 
            {
                pagePath: "pages/me/me",
                text: "账号",
                iconPath: "./asset/images/me.png",
                selectedIconPath: "./asset/images/me_focus.png"
            }]
        }
    }
    
    render() {
        return (
        <Provider store={store}>
            <Index />
        </Provider>
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
