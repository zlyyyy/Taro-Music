​const prefix = 'http://localhost:3000/' // api地址前缀
export default(config => {
    return Object.keys(config).reduce((copy, name) => {
      copy[name] = `${prefix}$config[name]`
      return copy
    })
})({
    // example api
    "search": "/search" 
  })