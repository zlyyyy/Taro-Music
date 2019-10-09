import Taro, { Component } from '@tarojs/taro'
import { View, Text, Progress, Image } from '@tarojs/components'
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
      loading: true,
      play: false,
      backgroundAudioManager: '',
      duration: 0,
      currentTime: 0,
      percent: 0
    }
  }
  componentWillMount() {
    console.log(this.$router.params.item)
    const params = this.$router.params
    this.setState({
      musicInfor: JSON.parse(params.item)
    })
  }

  componentDidMount() {
    const { id, name, artists, album:{picUrl}={} } = this.state.musicInfor
    Taro.setNavigationBarTitle({
      title: name
    })
    Taro.request({
      url: 'https://api.zhaoly.cn/song/url',
      data: {
        id
      }
    }).then(res => {
      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      backgroundAudioManager.title = name
      backgroundAudioManager.epname = name
      backgroundAudioManager.singer = artists
      backgroundAudioManager.coverImgUrl = picUrl
      console.log(backgroundAudioManager)
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = res.data.data[0].url
      let duration = backgroundAudioManager.duration || 0;
      let currentTime = backgroundAudioManager.currentTime || 0;
      // 音频开始播放
      backgroundAudioManager.onPlay(() => {
        this.setState({
          play: true
        });
        duration = backgroundAudioManager.duration || 0;
        this.setState({
          duration: this.timeFormat(duration),
        })
      });
      // 音频播放进度控制
      backgroundAudioManager.onTimeUpdate(() => {
        duration = backgroundAudioManager.duration;
        currentTime = backgroundAudioManager.currentTime;
        this.setState({
          duration,
          currentTime
        })
      });
      // 音频暂停后
      backgroundAudioManager.onPause(() => {
        this.setState({ play: false });
      });

      // 音频停止后
      backgroundAudioManager.onStop(() => {
        this.setState({ play: false });
      });
      this.setState({
        backgroundAudioManager,
        duration,
        currentTime,
        play: true
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // 播放音乐
  playMusic = () => {
    const { play } = this.state
    this.setState({
      play: !play
    })
    if (this.state.play) {
      this.state.backgroundAudioManager.pause()
    } else {
      this.state.backgroundAudioManager.play()
    }
  }
  // 播放时间格式化
  timeFormat(time) {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time % 60);
    let _minute = minute < 10 ? "0" + minute : minute;
    let _second = second < 10 ? "0" + second : second;
    return `${_minute}:${_second}`;
  }
  render() {
    const {
      play,
      musicInfor: { name, artists, album }={},
      duration,
      currentTime,
      percent
    } = this.state || {}
    console.log(percent)
    return (
      <View>
        <View className='music-infor'>
          <Text className='music-infor-name'>{name}</Text>
          <Text className='music-infor-author'>{artists}</Text>
          <View className='music-infor-img'>
            <Image
              src={album.picUrl}
            />
          </View>
          <View className='music-handle'>
            <Image
              onClick={this.playMusic}
              src={play ? suspendPng : playPng}
            />
          </View>
          <View className='music-progress'>
            <Text className='music-progress-start'>
              {this.timeFormat(currentTime)}
            </Text>
            <View className='music-progress-content'>
              <Progress
                percent={currentTime/duration*100}
                strokeWidth={2}
                activeColor='blue'
              />
            </View>
            <Text className='music-progress-end'>
              {this.timeFormat(duration)}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

