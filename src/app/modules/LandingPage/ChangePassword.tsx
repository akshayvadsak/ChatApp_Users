import React, { useState } from 'react'
import { User } from '../../../client/client/user/User';
import AcountListing from "../../components/AcountListing"
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Mail } from '../../../client/client/system/Mail';
import * as chat from './../../modules/apps/chat/ChatRedux'
import TopBarRightMenus from './TopBarRightMenus';

type Props = {
   className: string
}

const ChangePassword: React.FC<Props> = ({ className }) => {
   const [oldPassword, setOldPassword] = useState<string>("");
   const [newPassword, setNewPassword] = useState<string>("");
   const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
   const dispatch = useDispatch()

   const [open, setOpen] = useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [popupMessage, setPopupMessage] = useState<string>(null as any);
   const [allowSignOut, setAllowSignOut] = useState<boolean>(false);
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

   const tryChangePassword = () => {
      if (oldPassword && newPassword && confirmNewPassword) {
         if ((newPassword === confirmNewPassword) &&
            (newPassword !== oldPassword)) {
            User.UpdatePassword(oldPassword, newPassword).then(() => {
               Mail.SendPasswordChangeNoticeEmail().then(() => {
                  setAllowSignOut(false);
                  setPopupMessage("Your Password has been changed.");
                  handleOpen();
               }).catch(() => {
                  setAllowSignOut(false);
                  setPopupMessage("Your Password has been changed.");
                  handleOpen();
               })
            }).catch(() => {
               setAllowSignOut(false);
               setPopupMessage("The Current Password is incorrect or New Passwords don't match!");
               handleOpen();
            })
         } else {
            setAllowSignOut(false);
            setPopupMessage("The Current Password is incorrect or New Passwords don't match!");
            handleOpen();
         }
      } else {
         setAllowSignOut(false);
         setPopupMessage("Cannot Leave Empty Fields!");
         handleOpen();
      }
   }

   return (
      <>
         <div className={`landing-overview ${className}`}>

            <AcountListing />

            <div className='right-overview'>
               <div className='FixTop-head AccountPage'>
                  <h2>Change Password</h2>

                  <div className='rightNavbar'>
                     <TopBarRightMenus />
                  </div>
               </div>

               <div className='page-body'>

                  <div className='row mb-10'>
                     <div className='col-lg-12'>
                        <div className='profile-overview'>
                           <div className='about-user profileInputs'>
                              <div className='row'>
                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Current Password</label>
                                       <input type="password" placeholder='Current Password' defaultValue={""} onChange={(e) => { setOldPassword(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">New Password</label>
                                       <input type="password" placeholder='New Password' defaultValue={""} onChange={(e) => { setNewPassword(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Confirm New Password</label>
                                       <input type="password" placeholder='Confirm New Password' defaultValue={""} onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='view-more-btn'>
                                    <Button variant="contained" className="green-btn" onClick={tryChangePassword}>Change Password</Button>
                                 </div>
                              </div>
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
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <Box sx={style}>
                  <HandOverPopup title={"Notice"} message={popupMessage} onConfirm={() => {
                     handleClose();
                     if (allowSignOut) {
                        User.SignOut().then(() => {
                           dispatch(chat.actions.setAuthorised(false));
                           dispatch(chat.actions.setMessages([]));
                           dispatch(chat.actions.setUnread(0));
                           dispatch(chat.actions.setCreditLoader(true));
                           dispatch(chat.actions.setCredits(0));
                           dispatch(chat.actions.setLoader(true));
                           dispatch(chat.actions.startTimer(false))
                        });
                     }
                  }} />
               </Box>
            </Fade>
         </Modal>
      </>
   )
}

export default ChangePassword
