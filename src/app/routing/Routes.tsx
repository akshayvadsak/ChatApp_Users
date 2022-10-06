/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import { getAuth, onAuthStateChanged} from "@firebase/auth";
 import {FC, useState, Suspense, lazy, useEffect} from 'react'
 import {Redirect, Switch, Route} from 'react-router-dom'
 import {MasterLayout} from '../../_metronic/layout/MasterLayout'
 import {PrivateRoutes} from './PrivateRoutes'
 import {Logout, AuthPage} from '../modules/auth'
 import {ErrorsPage} from '../modules/errors/ErrorsPage'
 import {MasterInit} from '../../_metronic/layout/MasterInit'
 import { User } from '../../client/client/user/User'
import { HttpsHandler } from "../../client/client/system/HttpsHandler";
import { Presence } from "../../client/client/system/Presence";
import { FallbackView } from '../../_metronic/partials'
import * as chat from './../modules/apps/chat/ChatRedux';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../setup/redux/RootReducer";
import CircularProgress from '@mui/material/CircularProgress';

 const Routes: FC = () => {
   //const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
   const dispatch = useDispatch();
   const isAuthorized = useSelector((state: RootState) => state.chat.isAuthorised)
   const isAuthChecked = useSelector((state: RootState) => state.chat.isAuthChecked)
   const TermsConditions = lazy(() => import('../modules/Cms/TermsConditions'))
   const PrivacyPolicy = lazy(() => import('../modules/Cms/PrivacyPolicy'))
   const AboutUs = lazy(() => import('../modules/Cms/AboutUs'))
   const Cookies = lazy(() => import('../modules/Cms/Cookies'))
 
  //  onAuthStateChanged(auth, (user) => {
  //   // console.log(auth,user)
  //    if (user) {
  //      // User is signed in, see docs for a list of available properties
  //      // https://firebase.google.com/docs/reference/js/firebase.User
  //      dispatch(chat.actions.setAuthorised(true))
  //      setAuthChecked(true);
  //      //checkForUserModel();
  //    } else {
  //      dispatch(chat.actions.setAuthorised(false))
  //      setAuthChecked(true);
  //    }
  //  });
   
   return (
     <>
     <Suspense fallback={<FallbackView />}>
     <Switch>
       <Route path='/terms-conditions' component={TermsConditions} />
       <Route path='/privacy-policy' component={PrivacyPolicy} />
       <Route path='/cookies' component={Cookies} />
       <Route path='/about-us' component={AboutUs} />
         {!isAuthorized && isAuthChecked ? (
           /*Render auth page when user at `/auth` and not authorized.*/
           <Route>
             <AuthPage />
           </Route>
         ) : isAuthChecked ? (
           /*Otherwise redirect to root page (`/`)*/
           <Redirect from='/auth' to={'/landing-pub'} />
         ) :
          <>
          </>
          }
 
         <Route path='/error' component={ErrorsPage} />
         
         <Route path='/logout' component={Logout} />
 
         {!isAuthorized && isAuthChecked ? (
           /*Redirect to `/auth` when user is not authorized*/
           <Redirect to='/auth/login' />
         ) : isAuthChecked ? (
             <>
              <MasterLayout>
                <PrivateRoutes />
              </MasterLayout>
            </>
         ) : 
         <>
         </>}
       </Switch>
     </Suspense>
       
       <MasterInit />
     </>
   )
 }
 
 export {Routes}