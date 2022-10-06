import { useEffect, useState } from 'react'
import { List, ListItemButton, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../../client/client/user/User';
import { isBrowser, isTablet } from 'react-device-detect';
import { ProfileAndLatestMessageModel } from '../../_metronic/helpers';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../setup';
import * as chat from './../modules/apps/chat/ChatRedux'

const AcountListing = () => {

   const [messages, setMessages] = useState<ProfileAndLatestMessageModel[]>();
   const chatMessages = useSelector((state: RootState) => state.chat.chatMessages, shallowEqual)
   const loader = useSelector((state: RootState) => state.chat.loader, shallowEqual)
   const unreadMsgs = useSelector((state: RootState) => state.chat.unreadMsgs, shallowEqual)
   const dispatch = useDispatch();

   const [email, setEmail] = useState<string>(User.Model?.email);
   const logout = () => {
      User.SignOut().then(() => {
         dispatch(chat.actions.setAuthorised(false));
         dispatch(chat.actions.setMessages([]));
         dispatch(chat.actions.setUnread(0));
         dispatch(chat.actions.setCreditLoader(true));
         dispatch(chat.actions.setCredits(0));
         dispatch(chat.actions.setLoader(true));
         dispatch(chat.actions.startTimer(false));
      });
   }

   useEffect(() => {
      User.GetUserAccount(User.Model?.uuid).then((model) => {
         if (model)
            setEmail(model.email);
      });
   }, [])

   useEffect(() => {
      setMessages(chatMessages);
   }, [chatMessages])




   // useEffect(() => {
   //    Chat.ListenForLastReadMessages("account-listing", (chatMessages) => {
   //       setLoading(false)
   //       setMessages(chatMessages);
   //       let unread = 0;
   //       chatMessages?.forEach((item) => {

   //          // item.message.timeFromNow = 
   //          if (item.read_status !== "read") {
   //             unread = unread + 1;
   //          }
   //       });
   //       setUnread(unread)
   //    })
   //    return () => {
   //       Chat.StopListeningForLastReadMessages("account-listing");
   //    }
   // }, [])

   return (
      <>

         <div className='left-overview'>
            <div className='sidechat-info'>
               <div className='msg-head'>

                  {isBrowser && <h3>Messages {!loader && <span>{unreadMsgs} unread</span>}</h3>}

                  {!isBrowser && <h3 id="kt_drawer_example_basic_button"><i className="fas fa-comment-alt"></i><span className='CountCounter'>{unreadMsgs}</span></h3>}


                  <div className="sidechat-top-bnts">
                     <Link to={`/landing-pub`}>
                        <IconButton color="error">
                           <i className="fas fa-home"></i>
                        </IconButton>
                     </Link>
                     <Link to={`/favorites`}>
                        <IconButton color="error" className="d-flex d-sm-none">
                           <i className="fa fa-heart"></i>
                        </IconButton>
                     </Link>

                     <Link to={'javascript:void()'} data-bs-toggle="modal" data-bs-target="#kt_modal_1" className="d-block d-sm-none">
                        <IconButton color="error" className='dollar-icon'>
                           <i className="material-icons">monetization_on</i>
                        </IconButton>
                     </Link>

                     <Link to={`/my-profile`} className="d-block d-sm-none">
                        <IconButton color="error">
                           <i className="fa fa-user"></i>
                        </IconButton>
                     </Link>
                  </div>
               </div>

               <div className='chat-nav-list custom-scroll d-none d-sm-block'>
                  <List component="nav" className='menuItemList'>
                     <Link to={`/my-profile`}>
                        <ListItemButton>
                           <div className='menuItem'>
                              <p>Basic Information</p>
                           </div>
                        </ListItemButton>
                     </Link>

                     <Link to={`/update-email`}>
                        <ListItemButton>
                           <div className='menuItem'>
                              <p>Email Address</p>
                              <h6>{email}</h6>
                           </div>
                        </ListItemButton>
                     </Link>

                     <Link to={`/change-password`}>
                        <ListItemButton>
                           <div className='menuItem'>
                              <p>Change Password</p>
                           </div>
                        </ListItemButton>
                     </Link>

                     <Link to={`/reset-password`}>
                        <ListItemButton>
                           <div className='menuItem'>
                              <p>Reset Password</p>
                           </div>
                        </ListItemButton>
                     </Link>

                     <Link to={`/delete-account`}>
                        <ListItemButton>
                           <div className='menuItem'>
                              <p>Delete Account</p>
                           </div>
                        </ListItemButton>
                     </Link>


                     <ListItemButton onClick={() => { logout() }}>
                        <div className='menuItem sign-out-menu'>
                           <p>Sign out</p>
                        </div>
                     </ListItemButton>
                  </List>
               </div>
            </div>
         </div>

         <div className='d-block d-sm-none'>
            <div className='FooterBottom'>
               <ul>
                  <li>
                     <Link to={`/my-profile`}>
                        <i className="fa fa-info-circle"></i>
                        <span>Basic Information</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={`/update-email`}>
                        <i className="fas fa-at"></i>
                        <span>Email Address</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={`/change-password`}>
                        <i className="fas fa-key"></i>
                        <span>Change Password</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={`/reset-password`}>
                        <i className="fas fa-lock-open"></i>
                        <span>Reset Password</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={`/delete-account`}>
                        <i className="fas fa-trash"></i>
                        <span>Delete Account</span>
                     </Link>
                  </li>
                  <li className='highlight' onClick={() => { logout() }}>
                     <i className="fa fa-sign-out-alt"></i>
                     <span>Sign out</span>
                  </li>
               </ul>
            </div>
         </div>



      </>
   )
}

export default AcountListing