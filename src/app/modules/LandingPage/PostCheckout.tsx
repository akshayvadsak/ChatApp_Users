import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ChatListing from "../../components/ChatListing"
import { Button } from '@mui/material';
import { MobileView, BrowserView } from 'react-device-detect';
import { IconButton } from '@mui/material';
import { IProps } from '../../routing/PrivateRoutes';
import { SessionHandler, SessionKeys } from '../../../client/client/system/SessionHandler';
import { User } from '../../../client/client/user/User';
import * as chat from './../../modules/apps/chat/ChatRedux'
import { useDispatch } from 'react-redux';
import { Analytics, AnalyticsId } from '../../../client/client/system/Analytics';
import { Products } from '../../../client/client/system/Products';
import { userInfo } from 'os';

const PostCheckout: React.FC<IProps> = props => {
   const { match } = props;
   const dispatch = useDispatch()
   const success = match.params.success as string;
   const price_id = match.params.price_id as string;
   const value = match.params.value as string;

   const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const history = useHistory();

   const redirectToLastRoute = useCallback(() => {
      let route = SessionHandler.GetItem(SessionKeys.SESSION_REDIRECT_ROUTE, "/landing-pub");
      SessionHandler.DeleteItem(SessionKeys.SESSION_REDIRECT_ROUTE);
      history.push(route);
   }, [history]);
   
   useEffect(() => {
      const pSuccess = (success === "true");
      //console.log(match)
      SessionHandler.SetItem(SessionKeys.SESSION_PURCHASE_STATE, pSuccess);
      SessionHandler.SetItem(SessionKeys.SESSION_PURCHASE_PRICE_ID, price_id);
      if(match.params.discountId!=='' && match.params.discountId!==null && match.params.discountId !== undefined){
         SessionHandler.SetItem(SessionKeys.SESSION_DISCOUNT_REF, match.params.discountId)
      }
      setPaymentSuccess(pSuccess);
      setIsLoading(false);
      let payload: Map<string, any> = new Map<string, any>();

      let eventId: string = AnalyticsId.PURCHASE_SUCCESS;
      if (pSuccess) {
        // alert("here 123")
         User.MarkUserAsPaidUser(true);
         User.AddCredits(parseInt(value)).then((credits)=>{
            dispatch(chat.actions.setCredits(credits))
         });
         if(match.params.discountId!=='' && match.params.discountId!==null && match.params.discountId !== undefined){
            User.AddToAvailedDiscounts(User.Model.uuid,match.params.discountId)
         }
         eventId = AnalyticsId.PURCHASE_SUCCESS;
      } else {
         eventId = AnalyticsId.PURCHASE_CANCELLED;
      }

      Products.GetProductPlanByPriceId(price_id).then(async (product) => {
         if (product) {
            payload.set("product_id", price_id);
            payload.set("cost", product.priceValue);
            Analytics.SendAnalyticsEvent(eventId, payload);
         }
      });
      redirectToLastRoute();
   }, [dispatch, price_id, redirectToLastRoute, success, value])

   return (
      <>
         <div className={`landing-overview`}>
            <ChatListing />

            <div className='right-overview'>
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

                     <BrowserView>
                        <ul className='nearby-sublink'>
                           <li><Link to={`/favorites`}><Button variant="text">Favorites</Button></Link></li>
                           {/* <li><Link to="#"><Button variant="text">Visitors</Button></Link></li> */}
                           <li>
                              <Link to={`/my-profile`}>
                                 <Button variant="text"> My Profile</Button>
                              </Link>
                           </li>
                        </ul>
                     </BrowserView>

                  </div>
               </BrowserView>
               <div className='page-body'>
                  <div className='row gy-6'>
                     {
                        isLoading?
                           <p>Loading...</p>
                        :
                           paymentSuccess ?
                              <p>Payment Successful</p>
                           :
                              <p>Payment Cancelled</p>
                     }
                  </div>
               </div>

               <MobileView>
                  <div className='logoBottomFix'>
                     <img alt="logo" src='/media/logos/flirtybum-white.png' className='h-50px' />
                  </div>
               </MobileView>

            </div>
         </div>
      </>
   );
}
export default PostCheckout