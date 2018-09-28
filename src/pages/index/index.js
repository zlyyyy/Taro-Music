import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import Search from '../../components/search/search'

import { setBanner } from '../../actions/home'

@connect(({ home }) => ({
    home
}), (dispatch) => ({
    setBanner () {
        Taro.request({
            url: 'http://localhost:3000/banner',
        }).then(res => {
            dispatch(setBanner(res.data.banners))
        })
    }
}))
export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }
    componentWillMount () { 
        this.props.setBanner()
    }
    render () {
        return (
        <View>
            <Search></Search>
            <Swiper
                className='banner'
                indicatorColor='#999'
                indicatorActiveColor='#FF3B42'
                circular
                indicatorDots
                autoplay>
                {
                    this.props.home.banner.map(item =>{
                        return (<SwiperItem key={item}>
                            <View className='demo-text-1'>
                                <Image src={item.picUrl}></Image>
                            </View>
                        </SwiperItem>)
                    })
                }
            </Swiper>
        </View>
        )
    }
}


