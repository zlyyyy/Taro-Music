import Taro, { Component } from '@tarojs/taro'
import { View, Text, Audio, Image } from '@tarojs/components'
import './music.scss'
import playPng from '../../asset/images/play.png'
import suspendPng from '../../asset/images/suspend.png'

export default class Index extends Component {

	config = {
		navigationBarTitleText: '音乐播放'
	}
	constructor() {
		super(...arguments)
		this.state = {
			musicInfor: {},
            loading:true,
            play: false,
            audioCtx: ''
		}
	}
	componentWillMount () { 
        console.log(this.$router.params)
        const params = this.$router.params
        this.setState({
            musicInfor: JSON.parse(params.item)
        })
	}

	componentDidMount () { 
        const { id, name } = this.state.musicInfor
        Taro.setNavigationBarTitle({
            title: name
        })
        Taro.request({
			url: 'http://api.zhaoly.cn/song/url',
			data: {
				id
			}
		}).then(res => {
            const audioCtx = Taro.createInnerAudioContext()
            audioCtx.autoplay = true
            audioCtx.loop = false
            audioCtx.src = res.data.data[0].url
            audioCtx.onPlay(() => {
                console.log('开始播放')
            })
            audioCtx.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            })
            this.setState({ 
                audioCtx: audioCtx,
                play: true
            })
        })
	}

	componentWillUnmount () { }

	componentDidShow () { }

    componentDidHide () { }
    // 播放音乐
	playMusic = () => {
		const { play } = this.state
		this.setState({
			play: !play
        })
        if (this.state.play) {
            this.state.audioCtx.pause()
        }else {
            this.state.audioCtx.play()
        }
    }
	render () {
		return (
		<View>
			<View className='music-infor'>
                <Text className='music-infor-name'>{this.musicInfor.name}</Text>
                <Text className='music-infor-author'>{this.musicInfor.artists}</Text>
                <View className='music-infor-img'>
                    <Image
                        src={this.musicInfor.album.picUrl}
                    />
                </View>
                <View className='music-handle'>
                    <Image
                        onClick={this.playMusic}
                        src={this.state.play?suspendPng : playPng}
                    />
                </View>
            </View>
		</View>
		)
	}
}

