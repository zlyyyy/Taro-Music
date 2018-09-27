import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getBanner } from '../../api/index'
import './index.scss'
import Search from '../../components/search/search'

import { setBanner } from '../../actions/home'

@connect(({ home }) => ({
    home
}), (dispatch) => ({
    setBanner (data) {
        dispatch(setBanner(data))
    }
}))
export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }
    componentWillMount () { 
        getBanner().then(res => {
            console.log(res)
            this.props.setBanner(res.banners)
            console.log(this.props)
        })
    }
    render () {
        return (
        <View>
            <Search></Search>
            <Swiper
                className='test-h'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                <SwiperItem>
                    <View className='demo-text-1'>1</View>
                </SwiperItem>
                <SwiperItem>
                <View className='demo-text-2'>2</View>
                </SwiperItem>
                <SwiperItem>
                <View className='demo-text-3'>3</View>
                </SwiperItem>
            </Swiper>
        </View>
        )
    }
}


