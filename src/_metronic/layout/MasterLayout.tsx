import React, { useEffect, useState, useCallback } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { MenuComponent } from "../../_metronic/assets/ts/components";
import { Button, CircularProgress } from '@mui/material';
import { ProductModel, Products, ProductType } from '../../client/client/system/Products';
import { Utils } from '../../client/client/system/Utils';
import Backdrop from '@mui/material/Backdrop';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { RootState } from '../../setup';
import { useSelector, useDispatch } from 'react-redux';
import * as chat from './../../app/modules/apps/chat/ChatRedux';
import { Analytics, AnalyticsId, AnalyticsUIId } from '../../client/client/system/Analytics';
import { User, UserModel } from '../../client/client/user/User';
import { SessionHandler, SessionKeys } from '../../client/client/system/SessionHandler';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import HandOverPopup from '../../app/modules/HandOverPopUp/HandOverPopUp';
import { Chat } from '../../client/client/chat/Chat';

const MasterLayout: React.FC = ({ children }) => {
   const history = useHistory();
   const [productPlans, setProductPlans] = useState<ProductModel[]>([]);
   const [userModel, setUserModel] = useState<UserModel>()
   const [activeIndex, setActiveIndex] = useState(-1)
   const [timerPlay, setTimerPlay] = useState(false);
   const [showExtended, setExtended] = useState(false);
   const dispatch = useDispatch()
   const isTimerPlaying = useSelector((state: RootState) => state.chat.isTimerPlaying);
   let dur = localStorage.getItem('remainingTime');
   let remainingTimeFromStorage = dur != null && parseInt(dur) > 0 ? parseInt(dur) : 10800;
   const [duration, setDuration] = useState(remainingTimeFromStorage)
   const [open, setOpen] = useState<boolean>(false);
   const [popupTitle, setPopupTitle] = useState<string>("");
   const [popupMessage, setPopupMessage] = useState<string>("");
   const [hasChoices, setHasChoices] = useState<boolean>(false);
   const [confirmText, setConfirmText] = useState<string>("");
   const [cancelText, setCancelText] = useState<string>("");
   const [confirmAction, setConfirmAction] = useState<any>();
   const [cancelAction, setCancelAction] = useState<any>();
   const [credits, setCredits] = useState<number>(0);
   const [loader, setLoader] = useState<boolean>(false);
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
   
   const handleOpen = () => setOpen(true);
   const handleClose = (event: any = null, reason: any = null) => {
      if (reason && reason === "backdropClick")
         return;

      setOpen(false);
   }

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

   const tryPurchaseCredits = async (priceId: string, cost: number, index:number) => {

     // console.log('test')
      let payload: Map<string, any> = new Map<string, any>();
      payload.set("product_id", priceId);
      payload.set("cost", cost);
      
      Analytics.SendAnalyticsEvent(AnalyticsId.PURCHASE_CLICKED, payload)
      Analytics.SendUIAnalyticsEvent(AnalyticsUIId.BTN_PURCHASE_CREDITS);
      Chat.SendGetCreditsFeedEntry().then(() => {
         if (userModel && userModel !== null) {
            if (productPlans[0].discountRef && productPlans[0].discountRef !== '' && productPlans[0].discountRef !== null) {
               Products.TryPurchaseProductById(priceId, cost, history.location.pathname, true, productPlans[0].discountRef);
            } else {
               Products.TryPurchaseProductById(priceId, cost, history.location.pathname);
            }
         }
      });
   }
   const location = useLocation()
   useEffect(() => {
      setTimeout(() => {
         MenuComponent.reinitialization()
      }, 500)
   }, [])

   useEffect(() => {
      let pSuccess = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_STATE, false);
      let priceId = SessionHandler.GetItem(SessionKeys.SESSION_PURCHASE_PRICE_ID, "");
      let discountId = SessionHandler.GetItem(SessionKeys.SESSION_DISCOUNT_REF,'');
      //console.log(pSuccess, priceId, discountId)
      SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_PRICE_ID);
      SessionHandler.DeleteItem(SessionKeys.SESSION_PURCHASE_STATE);

      let confirmAction = () => {

      };
      let cancelAction = () => {

      };

      if (pSuccess) {
         confirmAction = () => {
            User.GetCredits().then((credits) => {
               setCredits(credits);
            })
         };
         openPopup("🎉 Hooray! 🎉", "Your Coins Have Been Credited To Your Account", false, "Let's Chat!", confirmAction, "Okay", cancelAction);
      } else if (priceId) {
         confirmAction = async () => {
            if(discountId === ''){
            await Products.GetProductPlanByPriceId(priceId).then((product) => {
               if (product) {
                     Products.TryPurchaseProductById(priceId,product.value, history.location.pathname)
               }
           });
           }
           if(discountId !== ''){
            await Products.GetDiscountById(discountId).then((res) => {
               Products.TryPurchaseProductById(priceId,res.value, history.location.pathname,true,discountId)
              })
           }
         };

         openPopup("😔 Oh No! 😔", "OH NO! Your Payment Has Failed", true, "Retry", confirmAction, "Cancel", cancelAction);
      }
   });

   useEffect(() => {
      setTimeout(() => {
         MenuComponent.reinitialization()
      }, 500)
   }, [location.key])

   useEffect(()=>{
      User.GetUserAccount(User.Model?.uuid).then((model) => {
         if (model) {
           setUserModel(model)
           
            Products.GetAllProductsByType(ProductType.PLANS).then(async (models) => {
               if (models)
                  if(models[0].discountRef && models[0].discountRef !== '' && models[0].discountRef !== null && model.availedDiscounts.indexOf(models[0].discountRef) < 0){
                     await Products.GetDiscountById(models[0].discountRef).then((res) => {
                       //console.log(res, models[0]);
                       models[0].priceId = res.priceId;
                       models[0].priceValue = res.priceValue;
                       //console.log(models)
                       setProductPlans(models);
                     })
                  }
                  setProductPlans(models)
               }) 
         }
      });
   },[])

   useEffect(() => {

   },[productPlans])

   // useEffect(() => {
   //    if (isTimerPlaying) {
   //       let dur = localStorage.getItem('remainingTime');
   //       let remainingTimeFromStorage = dur != null && parseInt(dur) > 0 ? parseInt(dur) : 10800;
   //       console.log(remainingTimeFromStorage)
   //       setDuration(remainingTimeFromStorage)
   //       setTimerPlay(true);
   //    } else {
   //       setTimerPlay(false);
   //    }
   // }, [isTimerPlaying])

   // $('#kt_modal_1').on('shown.bs.modal', function (e) {
   //    $(this).off('shown.bs.modal');
   //    if (!isTimerPlaying) {
   //       dispatch(chat.actions.startTimer(true))
   //    } else {
   //       // if (localStorage.getItem('remainingTime')) {
   //       //    let dur = localStorage.getItem('remainingTime');
   //       //    let remainingTimeFromStorage = dur != null && parseInt(dur) > 0 ? parseInt(dur) : 10800;
   //       //    console.log(remainingTimeFromStorage)
   //       //    setDuration(remainingTimeFromStorage)

   //       // }
   //    }
   // })

   return (
      <>
         {children}

         <div className="modal fade ModalCredits" tabIndex={-1} id="kt_modal_1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
               <div className="modal-content">
                  <div className='CloseBTns'>
                     <div
                        className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     >
                        <img src="/media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" alt="" />
                     </div>
                  </div>
                  <div className="modal-body">
                     <div className='InnerContents'>
                        <div className='row align-items-center'>
                           <div className='col-lg-12'>
                              <div className='InerHeding'>
                                 <h1>Chat Credits ❤️</h1>
                              </div>
                           </div>
                        </div>

                        {/* <div className='TimerBox'>
                           <label>{!timerPlay && showExtended ? 'Offer Extended' : 'These offers end in'}</label>




                           {timerPlay && <CountdownCircleTimer
                              isPlaying={timerPlay}
                              duration={duration}
                              size={90}
                              strokeWidth={0}
                              trailColor={'#181C32'}
                              colors={['#181C32', '#181C32']}
                              colorsTime={[7, 5]}
                              onComplete={() => {
                                 // do your stuff here
                                 //setTimerPlay(false);
                                 setExtended(true);
                                 setDuration(10800);
                                 setTimerPlay(false)
                                 setTimeout(() => {
                                    setTimerPlay(true)
                                 }, 300000);
                              }}
                              onUpdate={(remainingTime) => { if(remainingTime>0){localStorage.setItem('remainingTime', remainingTime.toString())} }}
                           >
                              {({ remainingTime }) => {
                                 const hours = Math.floor(remainingTime / 3600)
                                 const minutes = Math.floor((remainingTime % 3600) / 60) == 0 ? '00' : Math.floor((remainingTime % 3600) / 60)
                                 const seconds = remainingTime % 60 == 0 ? '00' : remainingTime % 60

                                 return `${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                              }}

                           </CountdownCircleTimer>}
                        </div>
 */}


                        <div className="tab-content" id="myTabContent">

                           <div className='OuterBox tab-pane fade active show'
                              id="kt_tab_pane_1"
                              role="tabpanel">
                              <div className='row gy-5'>
                                 <div className='col-lg-6 first-box'>
                                    {
                                       productPlans?.map((product, index) => {
                                          if (index < 3)
                                             return (
                                                <div onClick={() => {setLoader(true); setActiveIndex(index); tryPurchaseCredits(product.priceId, product.value, index) }} key={`product-plan@${Utils.GenerateRandomID()}`} className='CreditBoxs cursor-pointer'>
                                                   <div className='Icon'>
                                                      {product.priceValue === 2.99 &&
                                                         <img src="/media/ChaterIcons/coin-one.svg" alt="" />}

                                                      {product.priceValue === 14.99 &&
                                                         <img src="/media/ChaterIcons/coin-two.svg" alt="" />}


                                                      {product.priceValue === 34.99 &&
                                                         <img src="/media/ChaterIcons/coin-two.svg" alt="" />}

                                                      {product.priceValue === 64.99 &&
                                                         <img src="/media/ChaterIcons/coin-three.svg" alt="" />}
                                                   </div>

                                                   <div className='CreditText'>
                                                      <h2>{product.productName}</h2>
                                                   </div>

                                                   <div className='PaymentBtn'>
                                                      <Button variant="contained" onClick={() => { tryPurchaseCredits(product.priceId, product.value, index) }}>
                                                         $ {product.priceValue}
                                                      </Button>
                                                   </div>

                                                   {product.priceValue === 2.99 &&
                                                      <div className='Badge'>
                                                         <span> Special Offer </span>
                                                      </div>
                                                   }
                                                   {index === activeIndex && loader && 
                                                   <div className='loaderBox'>
                                                      <CircularProgress />
                                                   </div>
                                                   }
                                                </div>
                                             )
                                       })
                                    }


                                 </div>

                                 <div className='col-lg-6 second-box'>
                                    {
                                       productPlans?.map((product, index) => {
                                          if (index > 2)
                                             return (
                                                <div onClick={() => {setLoader(true); setActiveIndex(index); tryPurchaseCredits(product.priceId, product.value, index) }} key={`product-plan@${Utils.GenerateRandomID()}`} className='CreditBoxs cursor-pointer'>
                                                   <div className='Icon'>
                                                      {product.priceValue === 119.99 &&
                                                         <img src="/media/ChaterIcons/coin-four.svg" alt="" style={{ width: '40px' }} />}

                                                      {product.priceValue === 199.99 &&
                                                         <img src="/media/ChaterIcons/coin-five.svg" alt="" style={{ width: '40px' }} />}
                                                   </div>
                                                   <div className='CreditText'>
                                                      <h2>{product.productName}</h2>
                                                   </div>
                                                   <div className='PaymentBtn'>
                                                      <Button variant="contained" onClick={() => { tryPurchaseCredits(product.priceId, product.value, index) }}>
                                                         $ {product.priceValue}
                                                      </Button>
                                                   </div>

                                                   {product.priceValue === 119.99 &&
                                                      <div className='Badge'>
                                                         <span> Most Purchased Package </span>
                                                      </div>
                                                   }

                                                   {product.priceValue === 199.99 &&
                                                      <div className='Badge'>
                                                         <span> Best Value </span>
                                                      </div>
                                                   }

                                                   {index === activeIndex && loader && 
                                                   <div className='loaderBox'>
                                                      <CircularProgress />
                                                   </div>
                                                   }
                                                </div>
                                             )
                                       })
                                    }
                                 </div>

                              </div>
                           </div>


                        </div>

                        <div className='pt-8 row'>
                           <div className='col-12 col-lg-6'>
                              <p className='mb-2'>We care about your private life and respect your privacy. Any charges made on your credit card will appear under: ‘PWR-Network'</p>
                              <p className='mb-2'><strong>This is not a subscription.</strong></p>
                              <p className='mb-2'>Your credit card will not be re-billed</p>
                           </div>
                           <div className='col-12 col-lg-6'>
                              <p className='mb-2'><strong>Need assistance? send us an email</strong></p>
                              <p className='mb-2'><Link to={'#'}>hello@flirtybum.com</Link></p>
                              <p className='mb-2'>By clicking any credit package you agree with our</p>
                              <p className='mb-2'><Link to={'/terms-conditions'}>Term & Conditions</Link></p>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>

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
      </>
   )
}
export { MasterLayout }
