import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image, Button } from '@tarojs/components'
import './index.scss'
import searchPng from '../../asset/images/search.png'

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
		Taro.request({
		  	url: 'http://api.zhaoly.cn/search/hot'
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
	setSearchValue = (e) => {
		const {value} = e.target
		this.setState({
			searchValue: value
		})
	}
	handleHotClick = (value, e) => {
		this.setState({
			searchValue: value
        })
		this.searchMusic(value)
	}
	searchMusic = (keywords, e) => {
		if (this.state.loading) {
		  return
		}
		this.state.loading = true
		Taro.showLoading({title: '搜索中'})
		Taro.request({
			url: 'http://api.zhaoly.cn/search',
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
				<View className='search-content'>
					<View className='search-left'>
						<Image src={searchPng}></Image>
					</View>
					<View className='search-right'>
						<Input
							onInput={this.setSearchValue}
							onConfirm={this.searchMusic.bind(this, this.state.searchValue)}
							confirmType='搜索'
							type='text'
							placeholder={'搜索歌曲、专辑、歌手'}
							placeholderClass='search-placeholder' 
							/>
					</View>
				</View>
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
								>
									<View className='search-list-item-img'>
										<Image src={item.album.picUrl}></Image>
									</View>
									<View className='search-list-item-infor'>
										<Text className='search-list-item-name'>{item.name}</Text>
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

