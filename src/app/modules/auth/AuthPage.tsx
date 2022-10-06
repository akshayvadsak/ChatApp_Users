/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {lazy, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'

export function AuthPage() {

  const SignInHelp = lazy(() => import('./components/SignInHelp'));
  
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    
    <Switch>
      <Route path='/auth/login' component={Login} />
      <Route path='/auth/registration' component={Registration} />
      <Route path='/auth/forgot-password' component={ForgotPassword} />
      <Route path='/auth/sign-in-help' component={SignInHelp} />
      <Route path='/sign-in-help' component={SignInHelp} />
      <Redirect from='/auth' exact={true} to='/auth/login' />
      <Redirect to='/auth/login' />
    </Switch>
        
  )
}
