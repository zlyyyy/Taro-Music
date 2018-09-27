import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './me.scss'

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


