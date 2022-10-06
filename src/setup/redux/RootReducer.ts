import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as chat from '../../app/modules/apps/chat/ChatRedux';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  chat: chat.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
