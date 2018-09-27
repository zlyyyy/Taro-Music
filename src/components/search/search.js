import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './search.scss'
import searchPng from '../../asset/images/search_icon.png'
import playerPng from '../../asset/images/player.png'

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
    render () {
        return (
            <View className='search flex-wrp'>
                <View className='search-left flex-item'>
                    <View className='flex-wrp'>
                        <View className='flex1'><Image src={searchPng}></Image></View>
                        <View className='flex6'><Input type='text' placeholder={'搜索音乐'} placeholderClass='search-placeholder' /></View>
                    </View>
                </View>
                <View className='search-right flex-item'>
                    <Image onClick={this.updateList} src={playerPng}></Image>
                </View>
            </View>
        )
    }
}


