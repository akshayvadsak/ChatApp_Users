import React, { useCallback, useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import { Link, useHistory } from 'react-router-dom'
import { Profile, ProfileModel } from '../../../client/client/user/Profile';
import { Utils } from '../../../client/client/system/Utils';
import ChatListing from "../../components/ChatListing"
import { Button } from '@mui/material';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { PaginatedProfileModels } from '../../../_metronic/helpers';
import { MobileView, BrowserView, TabletView, isTablet } from 'react-device-detect';
import { IconButton } from '@mui/material';
import Footer from '../Footer/Footer'
import * as chat from './../../modules/apps/chat/ChatRedux'
import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Products } from '../../../client/client/system/Products';
import { SessionHandler, SessionKeys } from '../../../client/client/system/SessionHandler';
import { User } from '../../../client/client/user/User';
// import { useSelector } from 'react-redux';
import { RootState } from '../../../setup';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import TopBarRightMenus from './TopBarRightMenus';
import { Analytics, AnalyticsId } from '../../../client/client/system/Analytics';
// import { RootState } from '../../setup';
// import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


type Props = {
   className: string
}

const slideImages = [
   {
      url: 'https://firebasestorage.googleapis.com/v0/b/chat-hub-1.appspot.com/o/images%2Fprofiles%2Fsweetameliee_%2Fprofile%2Fsweet_nude_photos6318-11904.jpg?alt=media&token=c26b35dd-a994-4d34-907a-e8792accbfa2',
      caption: 'Slide 1'
   },
   {
      url: 'https://firebasestorage.googleapis.com/v0/b/chat-hub-1.appspot.com/o/images%2Fprofiles%2Flady_megan%2Fprofile%2F01.jpg?alt=media&token=60c3a5a8-e5ce-4c6a-b408-f36376bb32d6',
      caption: 'Slide 2'
   },
   {
      url: 'images/slide_4.jpg',
      caption: 'Slide 3'
   },
];

const zoomOutProperties = {
   duration: 2000,
   transitionDuration: 400,
   infinite: true,
   indicators: false,
   scale: 0.9,
   arrows: false
};

const Landing: React.FC<Props> = ({ className }) => {
   const history = useHistory();
   const dispatch = useDispatch();
   const [paginatedModel, setPaginatedModel] = useState<PaginatedProfileModels>(null as any);
   const [profileModels, setProfileModels] = useState<ProfileModel[]>([]);
   const [filteredModels, setFilteredModels] = useState<ProfileModel[]>([]);
   const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false);
   const [minAge, setMinAge] = useState<number>(18);
   const [maxAge, setMaxAge] = useState<number>(49);
   const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>(null as any);
   const [currProfiles, setCurrProfiles] = useState<ProfileModel[]>(null as any);
   const [value, setValue] = React.useState<[number, number]>(
      [18, 49]
   );
   const [showLoader, setShowLoader] = useState(false);
   const unreadMsgs = useSelector((state: RootState) => state.chat.unreadMsgs, shallowEqual)

   const [open, setOpen] = useState<boolean>(false);
   const [popupTitle, setPopupTitle] = useState<string>("");
   const [popupMessage, setPopupMessage] = useState<string>("");
   const [hasChoices, setHasChoices] = useState<boolean>(false);
   const [confirmText, setConfirmText] = useState<string>("");
   const [cancelText, setCancelText] = useState<string>("");
   const [confirmAction, setConfirmAction] = useState<any>();
   const [cancelAction, setCancelAction] = useState<any>();
   const [emptyProfilePics, setEmptyProfilePics] = useState<string[]>([])

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   useEffect(()=>{

   },[emptyProfilePics])

   useEffect(()=>{
       User.TrySendEmailVerificationRewards().then((res)=>{
         User.GetCredits().then((credits) => {
            //alert(credits)
            if (credits)
              dispatch(chat.actions.setCredits(credits));
    
            dispatch(chat.actions.setCreditLoader(false));
          });
       })
      
   },[])

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

   const handleSliderChange = (event: Event, newValue: any) => {
      setValue(newValue);
   };

   const onProfileClicked = (profile_id: string) => {
      let payload: Map<string, any> = new Map<string, any>();
      payload.set("profile_id", profile_id);
      Analytics.SendAnalyticsEvent(AnalyticsId.VIEW_PROFILE, payload);
      history.push(`/user-profile/${profile_id}`);
   }

   const onLoadMoreClicked = () => {
      if (paginatedModel.lastVisible) {
         setLastVisible(paginatedModel.lastVisible)
         let currProfiles = [...profileModels];
         setCurrProfiles(currProfiles);
         setIsNextAvailable(false);
      }
   }

   const handleChange = (event: any, value: any) => {
      setValue(value);
      setMinAge(value[0]);
      setMaxAge(value[1]);
   }

   const onEmailCardClicked = () => {
      setShowLoader(true);
      const confirmAction = () => {

      };
      const cancelAction = () => {

      };
      User.SendEmailVerificationEmail().then(() => {
         setShowLoader(false)
         openPopup("Notice", `Verification Email Has Been Sent To ${User.Model?.email}. Please Check Your Email Inbox Or Spam Folder`, false, "Ok", confirmAction, "Ok", cancelAction);
         // setPopupMessage("Verification Email Sent!");
         // handleOpen();
      }).catch(() => {
         setShowLoader(true)
         openPopup("Notice", "Failed to send Verification Email!", false, "Ok", confirmAction, "Ok", cancelAction);
         setShowLoader(false)
         // setPopupMessage("Failed to send Verification Email!");
         // handleOpen();
      })
   }

   const onProfileCardClicked = () => {
      history.push('/my-profile')
   }

   useEffect(() => {
      Profile.GetAllProfilesPaginated(lastVisible, currProfiles, true, 24).then((paginatedModel) => {
         if (paginatedModel) {
            setPaginatedModel(paginatedModel);
            setIsNextAvailable(paginatedModel.nextPageExists);
            setProfileModels(paginatedModel.profiles);
         }
      });
   }, [currProfiles, lastVisible])

   useEffect(() => {
      let filter: ProfileModel[] = [];

      if (minAge > 0 && maxAge > 0) {
         profileModels.forEach((model) => {
            if (model.age >= minAge && model.age <= maxAge)
               filter.push(model);
         });
      }

      setFilteredModels(filter);
   }, [minAge, maxAge, profileModels])

   /*useEffect(() => {
      let pSuccess = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_STATE, false);
      let priceId = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_PRICE_ID, "");

      SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_PRICE_ID);
      SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_STATE);

      let confirmAction = () => {

      };
      let cancelAction = () => {

      };

      if (pSuccess) {
         confirmAction = () => {
            User.GetCredits().then((credits) => {

            })
         };
         openPopup("🎉 Hooray! 🎉", "Your Coins Have Been Credited To Your Account", false, "Let's Chat!", confirmAction, "Okay", cancelAction);
      } else if (priceId) {
         confirmAction = async () => {
            await Products.GetProductPlanByPriceId(priceId).then((product) => {
               if (product) {
                  Products.TryPurchaseProductById(priceId,product.value, history.location.pathname)
               }
           });
            
         };

         openPopup("😔 Oh No! 😔", "OH NO! Your Payment Has Failed", true, "Retry", confirmAction, "Cancel", cancelAction);
      }
   });*/
   const [styled, setStyle] = useState({ display: 'none' });


   return (
      <>
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
                     confirmAction();
                  }} onCancel={() => {
                     handleClose();
                     cancelAction();
                  }} />
               </Box>
            </Fade>
         </Modal>

         <div className={`landing-overview ${className}`}>
            {!isTablet && <ChatListing />}

            <div className={!isTablet ? 'right-overview' : 'right-overview w-100'}>
               <BrowserView>
                  <div className='FixTop-head'>
                     <div className='logoflirty'>
                        <img alt="logo" src='/media/logos/flirtybum-white.png' className='h-50px' />
                     </div>
                     <MobileView>
                        <div className="sidechat-top-bnts">
                           <Link to={`/favorites`}>
                              <IconButton color="error" className="d-flex d-sm-none">
                                 <i className="fa fa-heart"></i>
                              </IconButton>
                           </Link>

                           <Link to={`/my-profile`} className="d-block d-sm-none">
                              <IconButton color="error">
                                 <i className="fa fa-user"></i>
                              </IconButton>
                           </Link>
                        </div>
                     </MobileView>

                     <BrowserView className='rightNavbar'>

                        <TopBarRightMenus />

                     </BrowserView>
                  </div>
               </BrowserView>

               <TabletView>
                  <div className={!isTablet ? 'FixTop-head' : 'FixTop-head w-100'}>
                     <div className='TabView'>  <h3 id="kt_drawer_example_basic_button"><i className="fas fa-comment-alt"></i><span className='CountCounter'>{unreadMsgs}</span></h3></div>


                     <div className='logoflirty'>
                        <img alt="logo" src='/media/logos/flirtybum-white.png' className='h-50px' />
                     </div>
                     <div className='rightNavbar'>
                        <TopBarRightMenus />
                     </div>
                  </div>
               </TabletView>
               <div className='page-body'>
                  <div className='nearby-distance-range-info'>
                     <div className='distance-range'>
                        <div className="row">
                           <div className="col-lg-6 col-md-12 col-12">
                              <div className='range-data-info'>
                                 <p>Age</p>
                                 <div className='range-data'>
                                    {minAge > 0 && maxAge > 0 && <h2>{minAge} - {maxAge}</h2>}
                                 </div>
                              </div>

                              <div className="rangeSlider">
                                 <Slider value={value} size="small" onChange={handleSliderChange} onChangeCommitted={($event: any, value: number | number[]) => handleChange($event, value)} min={18} max={80} valueLabelDisplay="auto" />
                                 {!(value[0] === 18 && value[1] === 49) && <Button variant="contained" className="red-btn" onClick={() => { setValue([18, 49]); setMinAge(18); setMaxAge(49) }}>Clear Filter</Button>}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <InfiniteScroll
                     key={`infinite-scroll@${Utils.GenerateRandomID()}`}
                     loadMore={onLoadMoreClicked}
                     hasMore={isNextAvailable}
                     loader={<div className="spinnerLoder loaderon"><CircularProgress /></div>}
                     element='div'
                     className="aligngrid row gy-6"
                  >
                     {
                        (User.CheckEmailVerificationStatus() === false) && <div key={`activate@${Utils.GenerateRandomID()}`} className='col-xl-2 col-lg-3 col-md-3 col-6 mb-5'>
                           <div className='nearby-profile activ confiryoumail' onClick={() => { onEmailCardClicked() }}>
                              <img alt="profile_photo" src="/media/logos/email-offer.png" />
                              {showLoader && <div className="spinnerLoder loaderon"><CircularProgress /></div>}
                           </div>
                        </div>
                     }

                     {

                     <div key={`activate@${Utils.GenerateRandomID()}`} className='col-xl-2 col-lg-3 col-md-3 col-6 mb-5'>
                        <div className='nearby-profile activ confiryoumail' onClick={() => { onProfileCardClicked() }}>
                           <img alt="profile_photo" src="/media/logos/complete-profile.png" />
                        </div>
                     </div>
                     }

                     {
                        filteredModels?.map((profile, index) => {
                           let itemKey = `profile@${Utils.GenerateRandomID()}`;
                           return (
                              <div key={itemKey} style={{'display':`${emptyProfilePics.indexOf(profile.id)<0?'block':'none'}`}} className='col-xl-2 col-lg-3 col-md-3 col-6 mb-5'>
                                 <div className='position-relative'>
                                    <div className='nearby-profile active' onClick={() => { onProfileClicked(profile.id) }} >
                                       {/* <div className='AgeTop'><p>Age: {profile.age}</p></div> */}
                                       <img alt="profile_photo" onError={()=>{let arr = [...emptyProfilePics];
                                       if(arr.indexOf(profile.id)<0){arr.push(profile.id);setEmptyProfilePics(arr);}}} src={profile?.photoURL} />
                                       <div className='BottomBarDetails'>
                                          <p><i className="fa fa-female me-2" aria-hidden="true"></i> {profile.displayName} <span>&nbsp;{profile.age}</span></p>
                                       </div>
                                       {/* <span className='dot-circle'></span> */}
                                    </div>
                                    {/* <div className="slide-container" style={styled}>
                                       <Slide {...zoomOutProperties}>
                                          {slideImages.map((slideImage, index) => (
                                             <div className="each-slide nearby-profile" key={index}>
                                                <div>
                                                   <img src={slideImage.url} alt="UserSlide" />
                                                </div>
                                             </div>
                                          ))}
                                       </Slide>
                                    </div> */}
                                 </div>
                              </div>
                           )
                        })
                     }
                  </InfiniteScroll>

               </div>

               <MobileView>
                  <div className='logoBottomFix'>
                     <img alt="logo" src='/media/logos/flirtybum-white.png' className='h-50px' />
                  </div>
               </MobileView>
               <Footer />
            </div>

         </div>
      </>
   );
}
export default Landing