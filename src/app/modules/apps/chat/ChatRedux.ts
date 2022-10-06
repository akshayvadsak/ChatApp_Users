import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ProfileAndLatestMessageModel } from './../../../../_metronic/helpers';

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetMessages: '[Set Messages] Action',
  SetLoader: '[Set Loader] Action',
  SetUnread: '[Set Unread] Action',
  SetCredits: '[Set Credits] Action',
  SetCreditLoader: '[Set Credit Loader] Action',
  SetAuthorised: '[Set Authorised] Action',
  SetAuthChecked: '[Set Auth Checked] Action',
  StartTimer: '[Start Timer] Action'
}

const initialChatState: IChatState = {
  chatMessages: [],
  unreadMsgs: 0,
  loader:true,
  credits:0,
  creditLoader:true,
  isAuthorised:false,
  isAuthChecked: false,
  isTimerPlaying:false
}

export interface IChatState {
  chatMessages?: ProfileAndLatestMessageModel[]
  unreadMsgs?: number,
  loader?: boolean,
  credits?: number,
  creditLoader?: boolean,
  isAuthorised?: boolean,
  isAuthChecked?: boolean,
  isTimerPlaying?: boolean
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo2-auth', whitelist: ['chatMessages', 'unreadMsgs','loader','credits','creditLoader','isAuthorised','isTimerPlaying']},
  (state: IChatState = initialChatState, action: ActionWithPayload<IChatState>) => {
    switch (action.type) {
      

      case actionTypes.SetMessages: {
        const chatMessages = action.payload?.chatMessages
        return {...state, chatMessages}
      }

      case actionTypes.SetLoader: {
        const loader = action.payload?.loader
        return {...state, loader}
      }

      case actionTypes.SetUnread: {
        const unreadMsgs = action.payload?.unreadMsgs;
        return {...state, unreadMsgs}
      }

      case actionTypes.SetCredits: {
        const credits = action.payload?.credits;
        return {...state, credits}
      }

      case actionTypes.SetCreditLoader: {
        const creditLoader = action.payload?.creditLoader;
        return {...state, creditLoader}
      }

      case actionTypes.SetAuthorised: {
        const isAuthorised = action.payload?.isAuthorised;
        return {...state, isAuthorised}
      }

      case actionTypes.SetAuthChecked: {
        const isAuthChecked = action.payload?.isAuthChecked;
        return {...state, isAuthChecked}
      }

      case actionTypes.StartTimer: {
        const isTimerPlaying = action.payload?.isTimerPlaying;
        return {...state, isTimerPlaying}
      }

      default:
        return state
    }
  }
)

export const actions = {
  // login: (accessToken: string) => ({type: actionTypes.Login, payload: {accessToken}}),
  // register: (accessToken: string) => ({
  //   type: actionTypes.Register,
  //   payload: {accessToken},
  // }),
  // logout: () => ({type: actionTypes.Logout}),
  // requestUser: () => ({
  //   type: actionTypes.UserRequested,
  // }),
  // fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
  setMessages: (chatMessages: any) => ({type: actionTypes.SetMessages, payload: {chatMessages}}),
  setLoader: (loader:boolean) => ({type: actionTypes.SetLoader, payload: {loader}}),
  setUnread: (unreadMsgs:any) => ({type: actionTypes.SetUnread, payload:{unreadMsgs}}),
  setCredits: (credits:any) => ({type: actionTypes.SetCredits, payload:{credits}}),
  setCreditLoader: (creditLoader:boolean) => ({type: actionTypes.SetCreditLoader, payload:{creditLoader}}),
  setAuthorised: (isAuthorised:boolean) => ({type: actionTypes.SetAuthorised, payload:{isAuthorised}}),
  setAuthChecked: (isAuthChecked: boolean) => ({type: actionTypes.SetAuthChecked, payload:{isAuthChecked}}),
  startTimer: (isTimerPlaying:boolean) => ({type: actionTypes.StartTimer, payload:{isTimerPlaying}})
}