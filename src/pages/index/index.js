import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image, Icon } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

	config = {
		navigationBarTitleText: '首页'
	}
	constructor() {
		super(...arguments)
		this.state = {
			searchValue: '',
			loading:true,
			hotList: [],
			musicList:[]
		}
	}
	componentWillMount () { 
	}

	componentDidMount () { 
		// 获取远程数据
        Taro.showLoading({ title: '加载中' })
        // 获取热门歌曲
		Taro.request({
		  	url: 'https://api.zhaoly.cn/search/hot'
		}).then(res => {
			Taro.hideLoading()
			if (res.data.code == 200) {
				console.log(this.state)
				console.log(res)
				this.setState({
					loading: false,
					hotList: res.data.result.hots
				})
			}
		})
	}

	componentWillUnmount () { }

	componentDidShow () { }

    componentDidHide () { }
    // 搜索框同步修改实践
	setSearchValue = (e) => {
		const {value} = e.target
		this.setState({
			searchValue: value
		})
    }
    // 清空搜索框
    clearSearchValue = () => {
		this.setState({
            searchValue: '',
            musicList: []
		})
    }
    // 热门歌曲点击事件
	handleHotClick = (value, e) => {
        console.log(value)
		this.setState({
			searchValue: value
        })
        this.searchMusic(value)
    }
    // 音乐跳转
    musicPlayJump = (item, e) => {
        const { id } = item
        Taro.request({
			url: 'https://api.zhaoly.cn/check/music',
			data: {
				id
			}
		}).then(res => {
            Taro.hideLoading()
            if(res.statusCode == 404){
                Taro.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
            }else{
                Taro.navigateTo({
                    url: `/pages/music/music?item=${JSON.stringify(item)}`
                })
            }
		})
    }
    // 搜索事件
	searchMusic = (keywords, e) => {
        console.log(this.state)
		if (this.state.loading) {
		  return
		}
		this.state.loading = true
		Taro.showLoading({title: '搜索中'})
		Taro.request({
			url: 'https://api.zhaoly.cn/search',
			data: {
				keywords,
				limit: 10
			}
		}).then(res => {
			Taro.hideLoading()
			if (res.data.code == 200) {
				let _data = []
				res.data.result.songs.forEach(ele => {
					function artistsFormat(val) {
						let _val
						if (!val) {
							return
						}
						val.forEach((ele, index) => {
							if (ele.name != '') {
								index > 0 ? _val += ` / ${ele.name}` : _val = ele.name
							}
						})
						return _val
					}
					const _ele = {
						name: ele.name,
						id: ele.id,
						artists: artistsFormat(ele.ar),
						album: {
							id: ele.al.id,
							name: ele.al.name,
							picUrl: ele.al.picUrl
						},
						fee: ele.fee,
						copyright: ele.copyright,
						duration: ele.dt
					}
					_data = [..._data, _ele]
				})
				this.setState({
					musicList: _data,
				  	loading: false
				})
			}
		})
	}
	render () {
		return (
		<View>
			<View className='search'>
				<View className={['search-content', this.state.searchValue == ''? null : 'active'].join(' ')}>
					<View className='search-left'>
                        <Icon className='search-icon' size='18' type='search' />
					</View>
					<View className='search-right'>
						<Input
                            value={this.searchValue}
							onInput={this.setSearchValue}
							onConfirm={this.searchMusic.bind(this, this.state.searchValue)}
							confirmType='搜索'
							type='text'
							placeholder={'搜索歌曲、专辑、歌手'}
							placeholderClass='search-placeholder' 
							/>
                        {
                            this.state.searchValue != ''
                            ?   <View className='search-clear' onClick={this.clearSearchValue}>
                                    <Icon className='search-clear-icon' size='18' type='clear'/>
                                </View>
                                : null
                        }
					</View>
				</View>
                {
                    this.state.searchValue != ''? <Text className='search-value-clear' onClick={this.clearSearchValue}>取消</Text> : null
                }
			</View>
			{
				this.state.searchValue == '' && this.state.musicList.length == 0
				? 	<View className='search-hot'>
						<View className='search-hot-title'>
							热门搜索
						</View>
						<View className='search-hot-content'
							>
							{
								this.state.loading
								? <View className='txcenter'>加载中</View>
								: this.state.hotList.map((item, index) => {
									return <View
										className='search-hot-item'
										key={item.first}
                                        onClick={this.handleHotClick.bind(this, item.first)}
										>
											{item.first}
										</View>
								})
							}
						</View>
					</View>
					: <View className='search-list-content'>
					{
						this.state.loading
						? <View className='txcenter'>加载中</View>
						: this.state.musicList.map((item, index) => {
							return <View
								className='search-list-item'
                                key={`${item.name}${index}`}
                                onClick={this.musicPlayJump.bind(this, item)}
								>
									<View className='search-list-item-img'>
										<Image src={item.album.picUrl}></Image>
									</View>
									<View className='search-list-item-infor'>
										<Text className='search-list-item-name ellipsis'>{item.name}</Text>
										<Text className='search-list-item-author'>{item.artists}</Text>
									</View>
								</View>
						})
					}
					</View>
			}
		</View>
		)
	}
}

