import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import {Routes} from './routing/Routes'
import { FirebaseApp } from './../client/client/FirebaseApp';
import { User } from './../client/client/user/User'
import { Analytics } from '../client/client/system/Analytics'
import { Presence } from '../client/client/system/Presence'

type Props = {
  basename: string
}

FirebaseApp.Initialize();
Presence.Initialize();
Analytics.Initialize();

const App: React.FC<Props> = ({basename}) => {
  
  
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
          <LayoutProvider>
            <AuthInit>
              <Routes />
            </AuthInit>
          </LayoutProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
