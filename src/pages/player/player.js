import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './search.scss'

import { add, minus, asyncAdd } from '../../actions/counter'

@connect(({ counter }) => ({
    counter
}), (dispatch) => ({
    add () {
        dispatch(add())
    },
    dec () {
        dispatch(minus())
    },
    asyncAdd () {
        dispatch(asyncAdd())
    }
}))
export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }
    componentWillMount () { 
     }

    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    render () {
        return (
        <View className='todo'>
            <Text>Hello, World</Text>
        </View>
        )
    }
}


