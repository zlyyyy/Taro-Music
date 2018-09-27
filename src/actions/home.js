import {
    SET_BANNER
} from '../constants'
  
export const setBanner = (banner) => {
    return {
        banner,
        type: SET_BANNER
    }
}

// 异步的action
export function asyncAdd () {
    return dispatch => {
        setTimeout(() => {
        dispatch(setBanner())
        }, 2000)
    }
}
  