import React, { useEffect, useState } from 'react'
import { Utils } from '../../../client/client/system/Utils';
import { Profile, ProfileModel } from '../../../client/client/user/Profile';
import { User, UserTag } from '../../../client/client/user/User';
import { ImageModel, InfoModel } from '../../../_metronic/helpers/dataExamples';

import FsLightbox from 'fslightbox-react';

import '../../../_metronic/assets/sass/core/vendors/plugins/_fslightbox_default.scss';
import { useHistory } from 'react-router-dom';
import { IProps } from '../../routing/PrivateRoutes';
import ChatListing from "../../components/ChatListing"
import { Button } from '@mui/material';
import { Chat } from '../../../client/client/chat/Chat';

import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Footer from '../Footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import * as chat from './../../modules/apps/chat/ChatRedux'
import { isMobile, isTablet } from 'react-device-detect';
import TopBarRightMenus from './TopBarRightMenus'

const MyProfileInfo: React.FC<IProps> = props => {
   const { match } = props;
   const info_id = match.params.id as string;
   const history = useHistory();
   const dispatch = useDispatch()

   const [haveLikedProfile, setHaveLikedProfile] = useState<boolean>(false);

   const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
   const [dataLoaded, setDataLoaded] = useState<boolean>(false);
   const [photoLoaded, setPhotoLoaded] = useState<boolean>(false);
   const [toggler, setToggler] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState<number>(0);
   const [lightboxSources, setLightboxSources] = useState<string[]>([]);
   const [similars, SetSimilars] = useState<ProfileModel[]>([]);

   const [credits, setCredits] = useState<number>(0);
   const [infoModel, setInfoModel] = useState<InfoModel>(null as any);
   const [profileId, setProfileId] = useState<string>(null as any);
   const [privateImages, setPrivateImages] = useState<ImageModel[]>([]);
   const [publicImages, setPublicImages] = useState<ImageModel[]>([]);
   const [forceUpdate, setForceUpdate] = useState<boolean>(false);

   const [open, setOpen] = useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [popupTitle, setPopupTitle] = useState<string>("");
   const [popupMessage, setPopupMessage] = useState<string>("");
   const [hasChoices, setHasChoices] = useState<boolean>(false);
   const [confirmText, setConfirmText] = useState<string>("");
   const [cancelText, setCancelText] = useState<string>("");
   const [sendMessage, setSendMessage] = useState<boolean>(false);

   const openPopup = (sendMessage: boolean, title: string, message: string, hasChoices: boolean, confirmText: string, cancelText: string) => {
      setSendMessage(sendMessage);
      setPopupTitle(title);
      setPopupMessage(message);
      setHasChoices(hasChoices);
      setConfirmText(confirmText);
      setCancelText(cancelText);
      handleOpen();
   }

   const toggleLightbox = (toggle: boolean, index: number) => {
      setLightboxIndex(index);
      setToggler(toggle);
   }

   const goToChatroom = () => {
      history.push(`/messaging-panel/${profileId}`);
   }

   const onProfileClicked = (profile_id: string) => {
      history.push(`/user-profile/${profile_id}`);
   }

   const likeProfile = () => {
      if (haveLikedProfile) {
         //alert("Already Liked this profile!");
         return;
      }

      User.AddToLikedProfiles(info_id).then(async () => {
         setHaveLikedProfile(true)
         let messageData = {
            text: `${User.Model?.displayName} liked your profile ❤`,
            uuid: User.Model?.uuid,
            photoURL: User.Model?.photoURL,
            isChatter: false,
            recepient_id: info_id,
            contentType: `text`
         }

         let roomId = Chat.GetPrivateChatRoomId(User.Model?.uuid, info_id);

         await Chat.SendMessage(roomId, messageData, "profile_like");
         let feedEntryData = {
            message: messageData
         }
         await Chat.SendToAdminFeed(roomId, feedEntryData, UserTag.LIKED_PROFILE);
         await Chat.SendToChatterRequestsFeed(roomId, feedEntryData, UserTag.LIKED_PROFILE);

         //alert("Successfully Liked Profile!");
         setForceUpdate(!forceUpdate);
      })
   }

   const TryRequestPrivatePhoto = () => {
      openPopup(true, "Request Photo?", `Would you like to spend 7 coins to request a private photo? (Current Credits: ${credits})`, true, "Ok", "Cancel");
      // let confirmed: boolean = window.confirm(`Would you liked to spend coins to request for a private photo? (Current Credits: ${credits}. Cost: 7 Credits)`);
      // if (confirmed) {
      //    User.DeductCredits(7).then(async (credits) => {
      //       setCredits(credits);
      //       let messageData = {
      //          text: "Hey, can I request for a private photo?",
      //          uuid: User.Model?.uuid,
      //          photoURL: User.Model?.photoURL,
      //          isChatter: false,
      //          recepient_id: info_id,
      //          contentType: `text`
      //       }

      //       let roomId = Chat.GetPrivateChatRoomId(User.Model?.uuid, info_id);

      //       await Chat.SendMessage(roomId, messageData);
      //       await Chat.SendToAdminFeed(roomId, messageData);
      //       await Chat.SendToChatterRequestsFeed(messageData, true);

      //       alert("Successfully send a request!");
      //    }).catch(() => {
      //       alert("Not enough credits!");
      //    })
      // }
   }

   const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 350,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 2,
      py: 4,
      borderRadius: 3,
      background: "#24222D"
   };

   useEffect(() => {

      User.GetCredits().then((credits) => {
         if (credits)
            setCredits(credits);
      });

      //console.log(`User Geolocation: ${User.Model?.geolocation.size}`);

      let profile_id = info_id;
      localStorage.setItem('opened_profile', profile_id);
      setProfileId(profile_id);
      Profile.GetProfile(profile_id).then((model) => {
         setInfoModel(model);

         Profile.GetSimilarProfiles(model).then((similars) => {
            if (similars) {
               SetSimilars(similars,);
               console.log("==========================");
               console.log(`Similar Models Lengths: ${similars.length}`);
               similars.forEach((similarModel) => {
                  console.log(`Name: ${similarModel.displayName}`);
               })
            }
         })

         setDataLoaded(true);
         if (model) {
            setInfoModel(model);
            User.GetUserAccount(User.Model?.uuid).then((model) => {
               if (model) {
                  setLikedProfiles(model.likedProfiles);
                  if (model?.likedProfiles?.includes(profile_id)) {
                     setHaveLikedProfile(true);
                  } else {
                     setHaveLikedProfile(false);
                  }
               }

               setDataLoaded(true);
            })

            Profile.GetAllProfileImages(profile_id, "public").then((images) => {
               if (images) {
                  let publicPhotos: ImageModel[] = [];
                  // let privatePhotos: ImageModel[] = [];
                  let sources: string[] = [];

                  images.forEach((image) => {
                     if (image.info.type === "public") {
                        publicPhotos.push(image.info);
                        sources.push(image.info.photoURL);
                     }
                     // else if (image.info.type === "private") {
                     //    privatePhotos.push(image.info);
                     // }
                  })

                  // setPrivateImages(privatePhotos);
                  setPublicImages(publicPhotos);
                  setPhotoLoaded(true);
                  setLightboxSources(sources);
               }
            });
         }
      })

   }, [info_id, forceUpdate]);

   return (
      <>
         <FsLightbox
            toggler={toggler}
            sources={lightboxSources}
            sourceIndex={lightboxIndex}
            showThumbsOnMount={true}
         />

         <div className={`landing-overview`}>
            {!isTablet && <ChatListing />}

            {
               dataLoaded ?

                  <div className={isTablet ? 'right-overview w-100' : isMobile ? 'right-overview mb-0' : 'right-overview'}>
                     <div className={!isTablet ? 'FixTop-head' : 'FixTop-head w-100'}>
                        <div className='user-name-info'>

                           <h3>{infoModel?.displayName}</h3>
                           <h4>{infoModel?.age}</h4>
                           <h6><i className="fas fa-map-marker-alt"></i>{User.Model?.geolocation.size !== undefined ? User.Model?.geolocation?.get('countryName') : ''}</h6>

                        </div>

                        <div className='rightNavbar d-none d-md-block'>
                           <TopBarRightMenus />
                        </div>

                     </div>

                     <div className='page-body user-profileInfo'>
                        <div className='profile-overview mb-10 mb-md-15'>
                           <div className='user-info'>
                              <div className='profile-thumb'>
                                 <img src={infoModel?.photoURL ? infoModel?.photoURL : "/media/avatars/150-2.jpg"} alt="" />
                              </div>

                              <div className='profile-icons'>
                                 <Button className={`btn btn-icon ${haveLikedProfile ? "btn-disabled" : ""}`} type='button' onClick={() => { likeProfile() }}>
                                    <i className="fa fa-thumbs-up me-2 m-0" aria-hidden="true"></i>  Like
                                 </Button>

                                 <Button className="btn btn-icon" type='button' onClick={() => { goToChatroom() }}>
                                    <i className='fa fa-envelope me-2 m-0' aria-hidden="true"></i> Message
                                 </Button>
                              </div>

                           </div>

                           <div className='about-user'>

                              <div className='user-name-info'>
                                 <h3>{infoModel?.displayName}</h3>
                                 <h4>{infoModel?.age}</h4>
                                 <h6><i className="fas fa-map-marker-alt"></i>{User.Model?.geolocation.size !== undefined ? User.Model?.geolocation?.get('countryName') : ''}</h6>
                              </div>

                              <div className='Info-details'>
                                 <h3>About Me</h3>
                                 <p>{infoModel?.aboutMe}</p>
                              </div>

                              <div className='Info-details'>
                                 <h3>Looking For</h3>
                                 <p>{infoModel?.lookingFor}</p>
                              </div>

                           </div>
                        </div>

                        <div className='row gy-10 mb-10 mb-md-15'>
                           <div className='col-lg-4 col-md-12 col-12'>

                              <div className='Info-details'>
                                 <h3>Public Photos</h3>
                              </div>

                              <div className='Photo-gallary custom-scroll'>
                                 {photoLoaded ? <ul className='multi-imgs'>
                                    {publicImages?.map((image, index) => {

                                       return (
                                          <li key={`public-img@${Utils.GenerateRandomID()}`} onClick={() => toggleLightbox(!toggler, index)}>
                                             <img src={image?.photoURL} alt="" />
                                             <div className='overlay'>
                                                <i className="bi bi-eye-fill"></i>
                                             </div>
                                          </li>
                                       )
                                    })}
                                 </ul> : <div className="spinnerLoder"><CircularProgress /></div>}
                              </div>
                           </div>

                           <div className='col-lg-8 col-md-12 col-12'>

                              <div className='Info-details'>
                                 <h3>Private Photos</h3>
                              </div>

                              <div className='Photo-gallary custom-scroll'>
                                 <ul className='multi-imgs'>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-1.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-2.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-3.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-4.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-5.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-6.png" alt="{infoModel?.displayName}" />
                                    </li>
                                    <li onClick={TryRequestPrivatePhoto}>
                                       <img className={'Blurred-Photo'} src="/media/blurr-images/blurr-image-7.png" alt="{infoModel?.displayName}" />
                                    </li>

                                 </ul>


                                 {/* {photoLoaded ? <ul className='multi-imgs'>
                                    {privateImages?.map((image, index) => {

                                       return (
                                          <li key={`private-img@${Utils.GenerateRandomID()}`} onClick={TryRequestPrivatePhoto}>
                                             <img className={'Blurred-Photo'} src={image?.photoURL} alt="" />
                                          </li>
                                       )
                                    })}
                                 </ul>:<div className="spinnerLoder"><CircularProgress /></div>} */}
                              </div>
                           </div>
                        </div>

                        <div className='user-description mb-md-15 mb-10'>
                           <div className='Info-details'>
                              <h3 className='about-profile-title'>More Information About <span>{infoModel?.displayName}</span>
                                 <i className="material-icons">favorite_border</i></h3>
                           </div>

                           <ul className='check-list'>
                              <li>Height: <strong>{infoModel?.height} cm</strong></li>
                              <li>Weight: <strong>{infoModel?.weight} lb</strong></li>
                              <li>Marital Status: <strong>{infoModel?.maritalStatus}</strong></li>
                              <li>Body Type: <strong>{infoModel?.bodyType}</strong></li>
                              <li>Ethnicity: <strong>{infoModel?.ethnicity}</strong></li>
                              <li>Hair Color: <strong>{infoModel?.hairColor}</strong></li>
                              <li>Eye Color: <strong>{infoModel?.eyeColor}</strong></li>
                              <li>Sexual Orientation: <strong>{infoModel?.sexualOrientation}</strong></li>
                              <li>Language: <strong>{infoModel?.language}</strong></li>
                           </ul>
                        </div>

                        <div className='user-description mb-5'>
                           <div className='Info-details'>
                              <h3 className='about-profile-title'>Other profiles like {infoModel?.displayName} <i className="material-icons">favorite_border</i></h3>
                           </div>
                           <div className='row gap-xl-10 gap-sm-5'>
                              {
                                 similars?.map((similarModel, index) => {
                                    //console.log(similarModel)
                                    let itemKey = `similarModel@${Utils.GenerateRandomID()}`
                                    return (
                                       <div key={itemKey} className='col-xl-2 col-lg-3 col-md-3 col-6 mb-5'>
                                          <div className='nearby-profile active' onClick={() => { onProfileClicked(similarModel.id) }}>
                                             <div className='AgeTop'><p>Age: {similarModel.age}</p></div>
                                             <img alt="profile_photo" src={similarModel.photoURL} />
                                             <div className='BottomBarDetails'>
                                                <p><i className="fa fa-female me-2" aria-hidden="true"></i>{similarModel.displayName}</p>
                                             </div>
                                             {/* <span className='dot-circle'></span> */}
                                          </div>
                                       </div>
                                    )
                                 })
                              }
                           </div>
                        </div>
                     </div>
                     <Footer />
                  </div>
                  :
                  <></>
            }
         </div>

         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <Box sx={style}>
                  <HandOverPopup title={popupTitle} message={popupMessage} hasChoice={hasChoices} confirmText={confirmText} cancelText={cancelText} onConfirm={() => {
                     handleClose();
                     if (sendMessage) {
                        User.DeductCredits(7).then(async (credits) => {
                           setCredits(credits);
                           dispatch(chat.actions.setCredits(credits));
                           let messageData = {
                              text: "Hey, can I request for a private photo?",
                              uuid: User.Model?.uuid,
                              photoURL: User.Model?.photoURL,
                              isChatter: false,
                              recepient_id: info_id,
                              contentType: `text`
                           }

                           let roomId = Chat.GetPrivateChatRoomId(User.Model?.uuid, info_id);

                           await Chat.SendMessage(roomId, messageData);
                           let feedEntryData = {
                              message: messageData
                           }
                           await Chat.SendToAdminFeed(roomId, feedEntryData, UserTag.NEW_MESSAGE);
                           await Chat.SendToChatterRequestsFeed(roomId, feedEntryData, UserTag.NEW_MESSAGE);

                           openPopup(false, "Hooray!", "Request Sent!", false, "Ok", "Ok");
                        }).catch((error) => {
                           openPopup(false, "Oh No!", "Not Enough Credits!", false, "Ok", "Ok");
                        })
                     }
                  }} onCancel={() => {
                     handleClose();
                  }} />
               </Box>
            </Fade>
         </Modal>
      </>
   )
}

export default MyProfileInfo