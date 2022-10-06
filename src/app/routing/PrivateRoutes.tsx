import React, { Suspense, lazy } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'

export function PrivateRoutes() {
  
  const Landing = lazy(() => import('./../modules/LandingPage/Landing'))
  const MessagingPanel = lazy(() => import('../modules/LandingPage/MessagingPanel'))
  const MyProfileInfo = lazy(() => import('../modules/LandingPage/MyProfileInfo'))
  const UserProfile = lazy(() => import('../modules/LandingPage/UserProfile'))
  const UpdateEmail = lazy(() => import('../modules/LandingPage/UpdateEmail'))
  const ChangePassword = lazy(() => import('../modules/LandingPage/ChangePassword'))
  const DeleteAccount = lazy(() => import('../modules/LandingPage/DeleteAccount'))
  const ResetPassword = lazy(() => import('../modules/LandingPage/ResetPassword'))
  const Favorites = lazy(() => import('../modules/LandingPage/Favorites'))
  const PostCheckout = lazy(() => import('../modules/LandingPage/PostCheckout'))
  const AboutUs = lazy(() => import('../modules/Cms/AboutUs'))
  const Cookies = lazy(() => import('../modules/Cms/Cookies'))
  const PrivacyPolicy = lazy(() => import('../modules/Cms/PrivacyPolicy'))
  const SignInHelp = lazy(() => import('../modules/auth/components/SignInHelp'))
  
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/about-us' component={AboutUs} />
        <Route path='/cookies' component={Cookies} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
        {/* <Route path='/terms-conditions' component={TermsConditions} /> */}
        <Route path='/landing-pub' component={Landing} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/messaging-panel/:id' component={MessagingPanel} />
        <Route path='/user-profile/:id' component={MyProfileInfo} />
        <Route path='/my-profile' component={UserProfile} />
        <Route path='/update-email' component={UpdateEmail} />
        <Route path='/delete-account' component={DeleteAccount} />
        <Route path='/change-password' component={ChangePassword} />
        <Route path='/reset-password' component={ResetPassword} />
        {/* <Route path='/builder' component={BuilderPageWrapper} /> */}
        {/* <Route path='/crafted/pages/profile' component={ProfilePage} /> */}
        {/* <Route path='/crafted/pages/wizards' component={WizardsPage} /> */}
        {/* <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} /> */}
        {/* <Route path='/apps/chat' component={ChatPage} /> */}
        {/* <Route path='/menu-test' component={MenuTestPage} /> */}
        <Route path='/sign-in-help' component={SignInHelp} />
        <Route path='/post-checkout/:price_id/:success/:value/:discountId' component={PostCheckout} />
        <Redirect from='/auth' to='/landing-pub' />
        <Redirect exact from='/' to='/landing-pub' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}

// Definition of IProps
export interface IProps extends RouteComponentProps<{ id?: string, success?: string, price_id?: string, value?: string, discountId?: string }> {
  // other properties
}