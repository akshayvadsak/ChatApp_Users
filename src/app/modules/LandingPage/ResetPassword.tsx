import React, { useState } from 'react'
import AcountListing from "../../components/AcountListing"
import { Button } from '@mui/material';
import { User } from '../../../client/client/user/User';

import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TopBarRightMenus from './TopBarRightMenus';

type Props = {
    className: string
}

const ResetPassword: React.FC<Props> = ({ className }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [email, setEmail] = useState<string>(null as any);
    const [popupMessage, setPopupMessage] = useState<string>(null as any);

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

    const sendResetPasswordEmail = () => {

        if (!email) {
            setPopupMessage("Cannot Leave the Email Field Empty!");
            handleOpen();
            return;
        }

        if (User.Model) {
            if (User.Model?.email !== email) {
                setPopupMessage("This is not your email!");
                handleOpen();
                setEmail("");
                return;
            }
        }

        User.SendPasswordResetEmail(email).then(() => {
            setPopupMessage("Email successfully sent!");
            handleOpen();
            setEmail("");
        }).catch(() => {
            setPopupMessage("Email does not exist!");
            handleOpen();
            setEmail("");
        });
    };

    return (
        <>
            <div className={`landing-overview ${className}`}>

                <AcountListing />

                <div className='right-overview'>
                    <div className='FixTop-head AccountPage'>
                        <h2>Reset Password</h2>

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
                                            {/* <div className='col-lg-12'>
                                                <div className="alert alert-success d-flex align-items-center p-5 mb-10">
                                                    <span className="svg-icon svg-icon-2hx svg-icon-success me-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z" fill="#000000" opacity="0.3" />
                                                                <path d="M10.875,15.75 C10.6354167,15.75 10.3958333,15.6541667 10.2041667,15.4625 L8.2875,13.5458333 C7.90416667,13.1625 7.90416667,12.5875 8.2875,12.2041667 C8.67083333,11.8208333 9.29375,11.8208333 9.62916667,12.2041667 L10.875,13.45 L14.0375,10.2875 C14.4208333,9.90416667 14.9958333,9.90416667 15.3791667,10.2875 C15.7625,10.6708333 15.7625,11.2458333 15.3791667,11.6291667 L11.5458333,15.4625 C11.3541667,15.6541667 11.1145833,15.75 10.875,15.75 Z" fill="#000000" />
                                                                <path d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z" fill="#000000" />
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <div className="d-flex flex-column">
                                                        {/* <h5 className="mb-1">This is an alert</h5> 
                                                        <span className='fs-sm-3'>Email matched, Please insert new password</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className='col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="">Email</label>
                                                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                </div>
                                            </div>

                                            {/*************After Email sending showing this tow field***************/}

                                            {/* <div className='col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="">New Password</label>
                                                    <input type="password" placeholder='New Password' />
                                                </div>
                                            </div>

                                            <div className='col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="">Confirm Password</label>
                                                    <input type="text" placeholder='Confirm Password' />
                                                </div>
                                            </div> */}

                                            {/*************End*************/}

                                            <div className='view-more-btn'>
                                                <Button variant="contained" className="green-btn" onClick={sendResetPasswordEmail}>Rest Password</Button>
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
                        }} />
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ResetPassword