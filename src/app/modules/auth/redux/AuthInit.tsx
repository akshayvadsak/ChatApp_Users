import { FC, useRef, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useSelector, connect, useDispatch, ConnectedProps } from 'react-redux'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import * as auth from './AuthRedux'
import * as chat from './../../apps/chat/ChatRedux'
import { getUserByToken } from './AuthCRUD'
import { RootState } from '../../../../setup'
import { Chat } from '../../../../client/client/chat/Chat';
import { User } from '../../../../client/client/user/User'
import MobileChatListing from '../../../components/MobileChatListing'
import { isMobile, isTablet } from 'react-device-detect'
import { getAuth, onAuthStateChanged, signInWithCustomToken} from "@firebase/auth";
import { HttpsHandler } from '../../../../client/client/system/HttpsHandler'
import { Presence } from '../../../../client/client/system/Presence'

const mapState = (state: RootState) => ({ auth: state.auth })
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false)
  const auth = getAuth();
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(false)
  const accessToken = useSelector<RootState>(({ auth }) => auth.accessToken, shallowEqual)
  const isAuthorised = useSelector((state: RootState) => state.chat.isAuthorised)

  useEffect(() => {
    dispatch(chat.actions.setAuthorised(false));
  }, [dispatch]);

  useEffect(() => {
    // console.log("Try Get Shit");
    // if (isAuthorised && User.Model) {
    //   console.log("Getting Shit");
      
    // }
  }, [dispatch, isAuthorised])

  const checkForUserModel = useCallback(async () => {
    if (isAuthorised && User.Model) 
    {
       HttpsHandler.GetGeolocation().then((geolocation) => {
         if (geolocation) {
           let geolocationMap = new Map<string, string>([
             ['countryName', geolocation?.countryName],
             ['countryCode', geolocation?.countryCode],
             ['city', geolocation?.state],
             ['state', geolocation?.state]
           ]);

           let params = {
             geolocation: {
               countryName: geolocation.countryName,
               countryCode: geolocation.countryCode,
               city: geolocation.city,
               state: geolocation.state
             }
           };

           User.Model.geolocation = geolocationMap;
           User.UpdateUserAccount(User.Model?.uuid, params)
         }
      });

      Presence.Connect();

      Chat.StopListeningForLastReadMessages("chat-listing");
      Chat.ListenForLastReadMessages("chat-listing", (chatMessages) => {
        dispatch(chat.actions.setMessages(chatMessages));
        dispatch(chat.actions.setLoader(false))
        let unread = 0;
        chatMessages?.forEach((item) => {

          // item.message.timeFromNow = 
          if (item.read_status !== "read") {
            unread = unread + 1;
          }
        });
        dispatch(chat.actions.setUnread(unread))
      })
      
      let params = {
        hasVisitedSite: true
      }
      await User.UpdateUserAccount(User.Model?.uuid, params);

      await User.TrySendEmailVerificationRewards();
      User.GetCredits().then((credits) => {
        if (credits)
          dispatch(chat.actions.setCredits(credits));

        dispatch(chat.actions.setCreditLoader(false));
      });
      return () => {
        Chat.StopListeningForLastReadMessages("chat-listing");
      }
    }
  }, [dispatch, isAuthorised])

  useEffect(()=>{
    if(localStorage.getItem('loginToken') && localStorage.getItem('loginToken') !== null) {
      if(isAuthorised){
        User.SignOut().then(()=>{
          let token = localStorage.getItem('loginToken')
          signInWithCustomToken(auth, token!)
            .then((userCredential) => {
              // Signed in
              localStorage.removeItem('loginToken')
              const user = userCredential.user;
              User.Initialize().then(() => {
                dispatch(chat.actions.setAuthorised(true))
                checkForUserModel();
              });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ...
            });
        })
      } else {
        let token = localStorage.getItem('loginToken')
      signInWithCustomToken(auth, token!)
        .then((userCredential) => {
          // Signed in
          localStorage.removeItem('loginToken')
          const user = userCredential.user;
          User.Initialize().then(() => {
            dispatch(chat.actions.setAuthorised(true))
            checkForUserModel();
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
      }
      
    }
  },[auth, isAuthorised, dispatch, checkForUserModel])

  onAuthStateChanged(auth, (user) => {
    // console.log(auth,user)
     if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/firebase.User
       User.Initialize().then(() => {
         dispatch(chat.actions.setAuthorised(true));
         dispatch(chat.actions.setAuthChecked(true));
         checkForUserModel();
       }); 
     } else {
      dispatch(chat.actions.setAuthorised(false));
      dispatch(chat.actions.setMessages([]));
      dispatch(chat.actions.setUnread(0));
      dispatch(chat.actions.setLoader(true));
      dispatch(chat.actions.setCredits(0));
      dispatch(chat.actions.setCreditLoader(true));
      dispatch(chat.actions.setAuthChecked(true));
     }
   });

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data: user } = await getUserByToken()
          dispatch(props.fulfillUser(user))
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(props.logout())
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (accessToken) {
      requestUser()
    } else {
      dispatch(props.logout())
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}{isMobile && <div
    id="kt_drawer_example_basic"
    data-kt-drawer="true"
    data-kt-drawer-activate="true"
    data-kt-drawer-toggle="#kt_drawer_example_basic_button"
    data-kt-drawer-close="#kt_drawer_example_basic_close"
    style={{ paddingTop: isTablet ? '0px' : '' }}
  // data-kt-drawer-width="500px"
  >
    <MobileChatListing />
  </div>}</>
}

export default connector(AuthInit)
