import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { search } from '../../api/index'
import './index.scss'

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
        search({ keywords: '海阔天空' }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
     }

    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    render () {
        return (
        <View className='todo'>
            <Button className='add_btn' onClick={this.props.add}>+</Button>
            <Button className='dec_btn' onClick={this.props.dec}>-</Button>
            <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
            <View>{this.props.counter.num}</View>
            <View>
                <Text>Hello, World</Text>
            </View>
        </View>
        )
    }
}


