import React, { useCallback, useEffect, useRef, useState } from 'react'
import { User, UserModel, UserTag } from '../../../client/client/user/User';
import { MessageModel } from '../../../_metronic/helpers/dataExamples';
import { Profile, ProfileModel } from '../../../client/client/user/Profile';
import { useHistory } from 'react-router-dom';
import { Chat } from '../../../client/client/chat/Chat';
import { FileHandler } from '../../../client/client/system/FileHandler';
import { Utils } from '../../../client/client/system/Utils';
import { IProps } from '../../routing/PrivateRoutes';
import ChatListing from "../../components/ChatListing"
import { IconButton, Button, CircularProgress } from '@mui/material';
import FsLightbox from 'fslightbox-react';

import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SessionHandler, SessionKeys } from '../../../client/client/system/SessionHandler';
import { Products } from '../../../client/client/system/Products';
import * as chat from './../../modules/apps/chat/ChatRedux'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, SearchBar, SearchContext, SearchContextManager } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import GiphyGrid from '../../components/GiphyGrid';
import Drawer from '@mui/material/Drawer';
import { CloseButton } from 'react-bootstrap-v5';
import { isBrowser, MobileOnlyView, BrowserView, isTablet, TabletView } from 'react-device-detect';
import TopBarRightMenus from './TopBarRightMenus';
import { Analytics, AnalyticsId } from '../../../client/client/system/Analytics';
import { RootState } from '../../../setup';

type ChatMessage = {
   chatSide: string
   messages: MessageModel[]
}

declare const window: any;
window.arr = [];
window.loader = false;

const MessagingPanel: React.FC<IProps> = props => {
   const { match } = props;
   const recepient_uuid = match.params.id as string;
   const dispatch = useDispatch()
   const gf = new GiphyFetch('egbLiNeHNt2PA2nU911kWHBeQTYkbM39');
   const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10, rating: 'r' })
   //gf.random
   const dummy = useRef<HTMLDivElement>(null);

   const [forceUpdate, setForceUpdate] = useState<boolean>(true);
   const [hasSentProfilePreferences, setHasSentProfilePreferences] = useState<boolean>(false);

   const [roomID, setRoomID] = useState<string>("");

   const [message, setMessage] = useState<string>('')
   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

   const [userModel, setUserModel] = useState<UserModel>(null as any);
   const [profileModel, setProfileModel] = useState<ProfileModel>(null as any);
   const [toggler, setToggler] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState<number>(0);
   const [lightboxSources, setLightboxSources] = useState<string[]>([]);
   const [loader, setLoader] = useState<boolean>(false)

   const [open, setOpen] = useState<boolean>(false);
   const [popupTitle, setPopupTitle] = useState<string>("");
   const [popupMessage, setPopupMessage] = useState<string>("");
   const [hasChoices, setHasChoices] = useState<boolean>(false);
   const [confirmText, setConfirmText] = useState<string>("");
   const [cancelText, setCancelText] = useState<string>("");
   const [confirmAction, setConfirmAction] = useState<any>();
   const [cancelAction, setCancelAction] = useState<any>();

   const [gifOpen, setGifOpen] = useState<boolean>(false);
   const [disableMessaging, setDisableMessage] = useState<boolean>(false);

   const isAuthorised = useSelector((state: RootState) => state.chat.isAuthorised)

   const handleOpen = () => setOpen(true);
   const handleClose = (event: any = null, reason: any = null) => {
      if (reason && reason === "backdropClick")
         return;

      setOpen(false);
   }

   const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '85%',
      maxWidth: '400px',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 3,
      background: "#24222D"
   };

   const history = useHistory();
   const [email, setEmail] = useState<string>(User.Model?.email);

   const openPopup = useCallback((title: string, message: string, hasChoices: boolean, confirmText: string, confirmAction: () => void | null, cancelText: string = "Ok", cancelAction: () => void | null) => {
      setPopupTitle(title);
      setPopupMessage(message);
      setHasChoices(hasChoices);
      setConfirmText(confirmText);
      setCancelText(cancelText);
      setConfirmAction(() => confirmAction);
      setCancelAction(() => cancelAction);
      handleOpen();
   }, []);

   const verifyEmail = () => {
      const confirmAction = () => {

      };
      const cancelAction = () => {

      };
      User.SendEmailVerificationEmail().then(() => {
         openPopup("Notice", `Verification Email Has Been Sent To ${email}. Please Check Your Email Inbox Or Spam Folder`, false, "Ok", confirmAction, "Ok", cancelAction);
         // setPopupMessage("Verification Email Sent!");
         // handleOpen();
      }).catch(() => {
         openPopup("Notice", "Failed to send Verification Email!", false, "Ok", confirmAction, "Ok", cancelAction);
         // setPopupMessage("Failed to send Verification Email!");
         // handleOpen();
      })
   }

   const scrollToBottom = () => {
      if (dummy.current)
         dummy.current.scrollIntoView({ block: 'end', inline: 'start', behavior: 'smooth' });
   }

   const sendMessage = async (e: any) => {
      e.preventDefault();

      let user = User.Model;
      let allowMessage = false;

      let messageData = {
         text: message,
         uuid: user.uuid,
         photoURL: user.photoURL,
         isChatter: false,
         recepient_id: recepient_uuid,
         contentType: `text`
      }

      setMessage('')

      if (!message)
         return;


      setDisableMessage(true);
      await User.DeductCredits(7).then((credits) => {
         dispatch(chat.actions.setCredits(credits))
         allowMessage = true;
      }).catch(() => {
         allowMessage = false;
      })
      setDisableMessage(false);

      if (!allowMessage) {
         $('#kt_modal_1').modal('show');
         return;
      }

      await Chat.SendMessage(roomID, messageData);

      scrollToBottom();

      if (!hasSentProfilePreferences) {
         User.AddProfileDetailsToUserPreferences(profileModel).then(() => {
            setHasSentProfilePreferences(true);
         });
      }

      let feedEntryData = {
         message: messageData
      }
      //Send Message to Admin Feed
      await Chat.SendToAdminFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);

      scrollToBottom();

      //Send Message to Chatter Request Feed

      await Chat.GetRoomStatus(roomID).then((result) => {
         if (!result)
            //Chat.SendMessage(chatterRequestRoomId, messageData, true);
            Chat.SendToChatterRequestsFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);
         scrollToBottom();
      })
   }

   const sendGiphy = async (data: any) => {
      let user = User.Model;
      let allowMessage = false;
      //console.log
      let messageData = {
         text: `https://i.giphy.com/media/${data.id}/100.gif`,
         uuid: User.Model?.uuid,
         photoURL: User.Model?.photoURL,
         recepient_id: recepient_uuid,
         contentType: `image`
      }

      setDisableMessage(true);
      await User.DeductCredits(7).then((credits) => {
         dispatch(chat.actions.setCredits(credits))
         allowMessage = true;
      }).catch(() => {
         allowMessage = false;
      })
      setDisableMessage(false);

      if (!allowMessage) {
         $('#kt_modal_1').modal('show');
         return;
      }

      await Chat.SendMessage(roomID, messageData);

      if (!hasSentProfilePreferences) {
         User.AddProfileDetailsToUserPreferences(profileModel).then(() => {
            setHasSentProfilePreferences(true);
         });
      }

      messageData.text = "has sent an image";
      scrollToBottom();
      let feedEntryData = {
         message: messageData
      }
      await Chat.SendToAdminFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);

      await Chat.GetRoomStatus(roomID).then((result) => {
         if (!result)
            Chat.SendToChatterRequestsFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);
      })
   }

   const uploadAndSendImage = async (e: any) => {
      let file = e.target.files[0];
      setLoader(true)
      //window.loader = true;
      //Note: size is in KB. Use this to check size limit.
      //let fileSize = file.size;
      let fileNameExt = file.name.split('.');
      let fileName = `${fileNameExt[0]}-${Utils.GenerateRandomID()}.${fileNameExt[1]}`;

      let allowMessage = false;

      setDisableMessage(true);
      await User.DeductCredits(7).then((credits) => {
         dispatch(chat.actions.setCredits(credits))
         allowMessage = true;
      }).catch(() => {
         allowMessage = true;
      })
      setDisableMessage(false);

      if (!allowMessage) {
         setLoader(false)
         window.loader = false;
         $('#kt_modal_1').modal('show');
         return;
      }

      FileHandler.RestrictImageSize(file, -1, (image) => {
         if (image) {
            FileHandler.UploadImage(image, `images/sites/${Chat.SITE}/rooms/${roomID}/` + fileName, async (url) => {
               if (url) {
                  let messageData = {
                     text: url,
                     uuid: User.Model?.uuid,
                     photoURL: User.Model?.photoURL,
                     recepient_id: recepient_uuid,
                     contentType: `image`
                  }

                  await Chat.SendMessage(roomID, messageData);
                  setLoader(false)

                  if (!hasSentProfilePreferences) {
                     User.AddProfileDetailsToUserPreferences(profileModel).then(() => {
                        setHasSentProfilePreferences(true);
                     });
                  }

                  messageData.text = "has sent an image";
                  scrollToBottom();
                  let feedEntryData = {
                     message: messageData
                  }
                  await Chat.SendToAdminFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);

                  await Chat.GetRoomStatus(roomID).then((result) => {
                     if (!result)
                        Chat.SendToChatterRequestsFeed(roomID, feedEntryData, UserTag.NEW_MESSAGE);
                  })
               }
            });
         }
      })
   }

   const parseMessages = (data: MessageModel[]) => {
      let side = '';
      let currId = '';

      let chatMessages: ChatMessage[] = [];
      let messageModels: MessageModel[] = [];
      data.forEach((msg) => {
         if (msg.user !== currId) {
            if (currId) {
               let data = [...messageModels]
               let chatMessage = {
                  chatSide: side,
                  messages: data
               }
               chatMessages.push(chatMessage);
               messageModels = [];
            }

            if (msg.user === User.Model?.uuid)
               side = 'right';
            else
               side = 'left';

            currId = msg.user;
         }
         messageModels.push(msg);
      })

      if (messageModels.length !== 0) {
         let data = [...messageModels]
         let chatMessage = {
            chatSide: side,
            messages: data
         }
         chatMessages.push(chatMessage);
         messageModels = [];
      }
      setChatMessages(chatMessages);
   }

   const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
         e.preventDefault()
         sendMessage(e)
      }
   }

   const inputStyle = {
      width: "0.1px",
      height: "0.1px",
      opacity: 0,
      overflow: "hidden",
   }

   // Use Effect
   useEffect(() => {
      if (!isAuthorised)
         return;
      //Get Chat Room Settings
      let self_uuid = User.Model?.uuid;
      let roomId = Chat.GetPrivateChatRoomId(self_uuid, recepient_uuid)

      setRoomID(roomId);

      //Initialize Chat Room
      setUserModel(User.Model);
      Profile.GetProfile(recepient_uuid).then((model) => {
         if (model)
            setProfileModel(model);
      })

      //Listen for Chatroom Messages
      console.log(`Recepient Id: ${recepient_uuid}`);
      console.log("Stop Listening for Room Id: " + roomId);
      Chat.StopListeningForChatRoomMessages(roomId);

      console.log("Try Listen for Room Messsages");
      Chat.ListenForChatRoomMessages(roomId, 25, (data) => {
         console.log("Now Lisetning for Room Messages");
         if (data) {
            //Parse Messages
            parseMessages(data);
            // Scroll to Bottom
            scrollToBottom();


            //Set Read Status
            Chat.SetReadStatus(roomId, 'read');

            // Change Route
            let unlisten = history.listen((location) => {
               Chat.StopListeningForChatRoomMessages(roomId);
               if (location.pathname.includes(Chat.CHAT_ROUTE)) {
                  setHasSentProfilePreferences(false);
                  setForceUpdate(!forceUpdate);
               }

               unlisten();
            });
         }

      })
   }, [history, forceUpdate, recepient_uuid, isAuthorised, openPopup])

   // useEffect(() => {
   //    let pSuccess = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_STATE, false);
   //    let priceId = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_PRICE_ID, "");

   //    SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_PRICE_ID);
   //    SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_STATE);

   //    let confirmAction = () => {

   //    };
   //    let cancelAction = () => {

   //    };

   //    if (pSuccess) {
   //       confirmAction = () => {
   //          User.GetCredits().then((credits) => {
   //             setCredits(credits);
   //          })
   //       };
   //       openPopup("🎉 Hooray! 🎉", "Your Coins Have Been Credited To Your Account", false, "Let's Chat!", confirmAction, "Okay", cancelAction);
   //    } else if (priceId) {
   //       confirmAction = async () => {
   //          await Products.GetProductPlanByPriceId(priceId).then((product) => {
   //             if (product) {
   //                Products.TryPurchaseProductById(priceId,product.value, history.location.pathname)
   //             }
   //         });
   //       };

   //       openPopup("😔 Oh No! 😔", "OH NO! Your Payment Has Failed", true, "Retry", confirmAction, "Cancel", cancelAction);
   //    }
   // });

   const toggleLightbox = (toggle: boolean, index: number) => {
      setLightboxIndex(index);
      setToggler(toggle);
   }



   const onProfileClicked = (profile_id: string) => {
      let payload: Map<string, any> = new Map<string, any>();
      payload.set("profile_id", profile_id);
      Analytics.SendAnalyticsEvent(AnalyticsId.VIEW_PROFILE, payload);
      history.push(`/user-profile/${profile_id}`);
   }

   return (
      <>
         <FsLightbox
            toggler={toggler}
            sources={window.arr}
            sourceIndex={lightboxIndex}
            showThumbsOnMount={true}
         />
         <div className={`landing-overview PanelBox`}>

            {!isTablet && <ChatListing activeItem={recepient_uuid} />}

            <div className={!isTablet ? 'right-overview' : 'right-overview w-100'}>
               <div className={!isTablet ? 'FixTop-head messagePanel-FixTop' : 'FixTop-head messagePanel-FixTop w-100'}>
                  <div className='chatprofile-grid onHead' onClick={() => { onProfileClicked(profileModel?.id) }}>
                     <div className='profile-img'>
                        <img src={profileModel?.photoURL} alt="" />
                     </div>

                     <div className='profile-details'>
                        <h2>{profileModel?.displayName}</h2>
                     </div>
                  </div>

                  <div className='rightHeader chatSublinks rightNavbar'>
                     <TopBarRightMenus />
                     {/* <ul className='nearby-sublink'>
                        <li>
                           <Link to={`/landing-pub`}>
                              <Button variant="text">Home</Button>
                           </Link>
                        </li>

                        <li>
                           <Link to={`/favorites`}><Button variant="text">Favorites</Button></Link>
                        </li>

                        <li>
                           <Link to={`/my-profile`}><Button variant="text">My Profile</Button></Link>
                        </li>

                        <li>
                           <Link to={`#kt_modal_1`} data-bs-toggle="modal" data-bs-target="#kt_modal_1" className='profile-details usercredit cursor-pointer'>
                              <Button variant="text"><h4>{creditsLoaded ? credits : "Loading"} <i className="fas fa-comment-dollar"></i></h4></Button>
                           </Link>
                        </li>
                     </ul> */}
                  </div>
               </div>

               <div className='page-body messagePanel-pageBody' id='kt_chat_messenger_body'>

                     
                  <div className='messagePanel custom-scroll'
                     data-kt-element='messages'
                     data-kt-scroll='true'
                     data-kt-scroll-activate='{default: false, lg: true}'
                     data-kt-scroll-max-height='auto'
                     data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
                     data-kt-scroll-wrappers='#kt_content, #kt_chat_messenger_body'
                     data-kt-scroll-offset='-2px'
                  >
                     <div className='InnerScrolls'>

                     {
                        chatMessages?.map((chatMessage) => {
                           let chatSide = chatMessage.chatSide;
                           let chatSideClassName = 'LeftSideChating'
                           let profileImage = 'media/avatars/150-1.jpg';

                           switch (chatSide) {
                              case 'left':
                                 chatSideClassName = 'LeftSideChating';
                                 profileImage = profileModel?.photoURL;
                                 break;
                              case 'right':
                                 chatSideClassName = 'RightSideChating';
                                 profileImage = userModel?.photoURL;
                                 break;
                           }

                           return (
                              <div key={`chat-messages@${Utils.GenerateRandomID()}`} className={chatSideClassName}>
                                 {/* <div className='CateDate'>
                                 <p>16 Feb 2016</p>
                              </div>  */}

                                 <div className='ChaterUser'>
                                    {
                                       chatSide === 'left' ?
                                          <div className='profile-img'>
                                             <img src={profileImage} alt="" />
                                          </div>
                                          :
                                          <>
                                          </>
                                    }

                                    <div className='UserChaterMEsg'>

                                       
                                       {
                                          chatMessage.messages?.map((msg, index) => {
                                             let lastIndex = chatMessage.messages.length - 1;
                                             let pClass = '';

                                             switch (index) {
                                                case 0:
                                                   pClass = '';
                                                   break;
                                                case lastIndex:
                                                   pClass = 'NewMesg';
                                                   break;
                                                default:
                                                   pClass = 'MidMesg';
                                                   break;
                                             }

                                             let sourceIndex: any;
                                             if (msg.contentType !== 'text') {
                                                let arr = [...lightboxSources];
                                                if (!msg.text.includes('https://i.giphy.com/')) {
                                                   arr.push(msg.text)
                                                }
                                                //setLightboxSources(arr);
                                                window.arr = arr;

                                                sourceIndex = arr.length - 1;
                                                // updateLightBoxSouce(arr);
                                             }
                                             return (
                                                <div key={`message@${Utils.GenerateRandomID()}`}>
                                                   {
                                                      profileModel?.displayName === "Free Credits" ? msg.contentType === 'text' ? <p

                                                         className={msg.contentType === 'text' ? pClass : 'NewMesg'}
                                                         dangerouslySetInnerHTML={{ __html: msg.text }}
                                                      >
                                                      </p> : <span className='NewMesg'><img onLoad={scrollToBottom} src={msg.text} width="300" alt="Pic" loading="lazy" onClick={() => !msg.text.includes('https://i.giphy.com/') ? toggleLightbox(!toggler, sourceIndex) : { javascript: void (0) }} /></span> : msg.contentType === 'text' ? <p

                                                         className={msg.contentType === 'text' ? pClass : 'NewMesg'}
                                                      >
                                                         {

                                                            msg.text
                                                         }
                                                      </p> : <span className='NewMesg'><img onLoad={scrollToBottom} src={msg.text} width="300" alt="Pic" loading="lazy" onClick={() => !msg.text.includes('https://i.giphy.com/') ? toggleLightbox(!toggler, sourceIndex) : { javascript: void (0) }} /></span>
                                                   }
                                                   {
                                                      profileModel?.displayName === "Free Credits" ?
                                                         <Button variant="contained" className="red-btn btn-colorlightgreen mt-3" onClick={verifyEmail}>Verify Email</Button>
                                                         :
                                                         <></>
                                                   }
                                                </div>
                                             )
                                          })
                                       }

                                       {/* {loader && <div className='loaderPlaceholder'>
                                          <div className='loaderBox'>
                                             <CircularProgress />
                                          </div>
                                       </div>} */}

                                    </div>
                                 </div>
                              </div>
                           )
                        })
                     }
                     {loader && <div className='loaderPlaceholder'>
                        <div className='loaderBox'>
                           <CircularProgress />
                        </div>
                     </div>}

                     
                     <div id="chatpanel" ref={dummy} /></div></div>
                  {/* <Grid width={800} columns={3} fetchGifs={fetchGifs} /> */}

                  <div className={!isTablet ? 'ChaterTyper' : 'ChaterTyper w-100'}>
                     <div className='TextArea' id='kt_chat_messenger_footer'>
                        <TabletView className='w-100'>
                           <textarea
                              className='TextAreaName'
                              data-kt-element='input'
                              placeholder={disableMessaging ? "Sending Message..." : "Write Your Message"}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={onEnterPress}
                              autoFocus={true}
                              style={{ color: "white", resize: 'none' }}
                              disabled={profileModel?.displayName === "Free Credits" || disableMessaging}
                           ></textarea>
                        </TabletView>
                        <BrowserView className='w-100'>
                           <textarea
                              className='TextAreaName'
                              data-kt-element='input'
                              placeholder={disableMessaging ? "Sending Message..." : "Write Your Message"}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={onEnterPress}
                              autoFocus={true}
                              style={{ color: "white", resize: 'none' }}
                              disabled={profileModel?.displayName === "Free Credits" || disableMessaging}
                           ></textarea>
                        </BrowserView>

                        <MobileOnlyView className='w-100'>
                           <textarea
                              className='TextAreaName'
                              data-kt-element='input'
                              placeholder={disableMessaging ? "Sending Message..." : "Write Your Message"}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={onEnterPress}
                              style={{ color: "white", resize: 'none' }}
                              disabled={profileModel?.displayName === "Free Credits" || disableMessaging}
                           ></textarea>
                        </MobileOnlyView>

                        <div className='ChaterTyper-icons'>
                           <div className='iconsAccess'>
                              <ul>
                                 <li>
                                    <IconButton disabled={profileModel?.displayName === "Free Credits" || disableMessaging} color="error">
                                       <label htmlFor="file-input" data-bs-toggle='tooltip' title='Send Image'>
                                          <i className="material-icons">photo_camera</i>
                                       </label>
                                       <input style={inputStyle} id="file-input" type="file" name="file-input" accept="image/*" onChange={uploadAndSendImage} />
                                    </IconButton>
                                 </li>
                              </ul>
                           </div>

                           <div className='GIFBtn'>
                              <Button
                                 type='button'
                                 variant='contained'
                                 disabled={profileModel?.displayName === "Free Credits" || disableMessaging}
                                 onClick={() => setGifOpen(true)}
                              >
                                 GIFs
                              </Button>
                           </div>

                           <div className='SendBtn'>
                              <Button disabled={profileModel?.displayName === "Free Credits" || disableMessaging} variant="contained" data-kt-element='send' onClick={sendMessage}>
                                 <img src="/media/ChaterIcons/icons8-send-60.png" alt="" />
                              </Button>
                           </div>

                           <div className='CreditBtn'>
                              <Button variant="contained" data-bs-toggle="modal" data-bs-target="#kt_modal_1">
                                 Credits
                              </Button>
                           </div>

                        </div>
                     </div>
                     <Drawer
                        BackdropProps={{ invisible: true }}
                        PaperProps={{
                           sx: { width: isBrowser ? 'calc(100% - 350px)' : '100%', left: isBrowser ? 'auto' : '', padding: 2, bgcolor: '#24222D' },
                        }}
                        anchor="bottom"
                        open={gifOpen}
                        onClose={() => setGifOpen(false)}
                     >
                        <Box sx={{ height: '400px' }}>
                           <Box component={'div'} className="closebtn">
                              <CloseButton onClick={() => setGifOpen(false)} />
                           </Box>
                           <SearchContextManager shouldDefaultToTrending={true} initialTerm='' options={{ lang: 'en', limit: 10, rating: 'r' }} apiKey='egbLiNeHNt2PA2nU911kWHBeQTYkbM39'>
                              <GiphyGrid onGiphySelect={(data: any) => { sendGiphy(data); setGifOpen(false) }} />
                           </SearchContextManager>
                        </Box>
                     </Drawer>
                  </div>
               </div>
            </div>
         </div>

         {/* <div
            id="kt_drawer_example_dismiss"

            className="bg-white"
            data-kt-drawer="true"
            data-kt-drawer-activate="true"
            data-kt-drawer-toggle="#kt_drawer_example_dismiss_button"
            data-kt-drawer-close="#kt_drawer_example_dismiss_close"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'300px', 'md': '500px'}"
         >
            <SearchContextManager shouldDefaultToTrending={true} initialTerm='' options={{ lang: 'en', limit: 10, rating: 'r' }} apiKey='egbLiNeHNt2PA2nU911kWHBeQTYkbM39'>
               <GiphyGrid />
            </SearchContextManager>
            <button className="btn btn-light-danger" data-kt-drawer-dismiss="true">Dismiss drawer</button>
         </div> */}



         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            disableEscapeKeyDown={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <Box sx={style}>
                  <HandOverPopup title={popupTitle} message={popupMessage} hasChoice={hasChoices} confirmText={confirmText} cancelText={cancelText} onConfirm={() => {
                     handleClose();
                     confirmAction();
                  }} onCancel={() => {
                     handleClose();
                     cancelAction();
                  }} />
               </Box>
            </Fade>
         </Modal>




         {/* <div
            id="kt_drawer_example_basic"
            data-kt-drawer="true"
            data-kt-drawer-activate="true"
            data-kt-drawer-toggle="#kt_drawer_example_basic_button02"
            data-kt-drawer-close="#kt_drawer_example_basic_close"
            data-kt-drawer-width="500px"
            data-kt-drawer-overlay="true"
         >
            <SearchContextManager shouldDefaultToTrending={true} initialTerm='' options={{ lang: 'en', limit: 10, rating: 'r' }} apiKey='egbLiNeHNt2PA2nU911kWHBeQTYkbM39'>
               <GiphyGrid />
            </SearchContextManager>
         </div> */}
      </>
   );
}
export default MessagingPanel