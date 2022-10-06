import React, { useState } from 'react'
import { User } from '../../../client/client/user/User';
import AcountListing from "../../components/AcountListing"
import { Utils } from '../../../client/client/system/Utils';
import { Button } from '@mui/material';

import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TopBarRightMenus from './TopBarRightMenus'

type Props = {
   className: string
}

const UpdateEmail: React.FC<Props> = ({ className }) => {
   const [oldEmail, setOldEmail] = useState<string>("");
   const [newEmail, setNewEmail] = useState<string>("");
   const [confirmNewEmail, setConfirmNewEmail] = useState<string>("");

   const [open, setOpen] = useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [popupMessage, setPopupMessage] = useState<string>(null as any);
   const [confirmAction, setConfirmAction] = useState<any>();

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

   const openPopup = (message: string, onConfirm: () => void | null) => {
      setPopupMessage(message);
      setConfirmAction(() => onConfirm);
      handleOpen();
   };

   const tryChangeEmail = () => {
      let confirmAction = () => {

      };

      if (oldEmail && newEmail && confirmNewEmail) {
         if (oldEmail !== User.Model?.email) {
            openPopup("This is not your email!", confirmAction);
            return;
         }

         if (newEmail === oldEmail) {
            openPopup("Your new email cannot be the same as your old email!", confirmAction);
            return;
         }

         if (newEmail !== confirmNewEmail) {
            openPopup("Your new email fields must match!", confirmAction);
            return;
         }

         User.UpdateEmail(newEmail).then(() => {
            confirmAction = () => {
               Utils.RefreshPage();
            };
            openPopup("Successfully updated your Email Address!", confirmAction);
         }).catch((err) => {
            openPopup(err.message, confirmAction);
         })
      } else {
         openPopup("Cannot Leave any blank fields!", confirmAction);
      }
   }

   return (
      <>
         <div className={`landing-overview ${className}`}>

            <AcountListing />

            <div className='right-overview'>
               <div className='FixTop-head AccountPage'>
                  <h2>Update Email</h2>

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
                                       <label htmlFor="">Current Email</label>
                                       <input type="text" placeholder='Current Email' defaultValue={""} onChange={(e) => { setOldEmail(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">New Email</label>
                                       <input type="text" placeholder='New Email' defaultValue={""} onChange={(e) => { setNewEmail(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Confirm New Email</label>
                                       <input type="text" placeholder='Confirm New Email' defaultValue={""} onChange={(e) => { setConfirmNewEmail(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='view-more-btn'>
                                    <Button variant="contained" className="green-btn" onClick={tryChangeEmail}>Update Email</Button>
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
                     confirmAction();
                  }} />
               </Box>
            </Fade>
         </Modal>
      </>
   )
}

export default UpdateEmail