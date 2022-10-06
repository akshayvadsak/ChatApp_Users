import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './../../rootReducer'

export interface AuthError {
    message: string
}

export interface CommonState {
    isAuth: boolean
    currentUser?: CurrentUser
    isLoading: boolean
    error: AuthError
}

export interface CurrentUser {
    id: string
    display_name: string
    email: string
    photo_url: string
}
export const initialState: CommonState = {
    isAuth: false,
    isLoading: false,
    error: {message: 'An Error occurred'},
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        
        setLogOut: (state) => {
            state.isAuth = false
            state.currentUser = undefined
        },
    },
})

export const {setLogOut} = commonSlice.actions

export const authSelector = (state: RootState) => state.common
