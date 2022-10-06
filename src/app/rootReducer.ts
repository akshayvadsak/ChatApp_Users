import { combineReducers } from '@reduxjs/toolkit'
import {commonSlice} from './features/common/commonSlice'

const rootReducer = combineReducers({
    common:commonSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer