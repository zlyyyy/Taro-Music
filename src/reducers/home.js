import { SET_BANNER } from '../constants'

const INITIAL_STATE = {
  num: 0,
  banner: []
}

export default function counter (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_BANNER:
        return {
            ...state,
            banner: action.banner
        }
        default:
        return state
    }
}