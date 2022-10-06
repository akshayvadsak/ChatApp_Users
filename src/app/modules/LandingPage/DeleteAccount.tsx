import React, { useState } from 'react'
import AcountListing from "../../components/AcountListing"
import { Button } from '@mui/material';
import { User } from '../../../client/client/user/User';

import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Mail } from '../../../client/client/system/Mail';
import { useDispatch } from 'react-redux';
import * as chat from './../../modules/apps/chat/ChatRedux'
import TopBarRightMenus from './TopBarRightMenus';

type Props = {
    className: string
}

const DeleteAccount: React.FC<Props> = ({ className }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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

    const onConfirm = () => {
        if (!email || !password) {
            setAllowSignOut(false);
            setPopupMessage("Cannot Leave Email or Password Field Blank!");
            handleOpen();
            return;
        }

        if (email === User.Model?.email) {
            Mail.SendAccountDeletionNoticeEmail().then(() => {
                setAllowSignOut(false);
                setPopupMessage("Your Account Has Been Deleted. Signing Out.");
                handleOpen();
                User.DeleteEmailAndPassUser(password).then(() => {
                    User.SignOut().then(() => {
                        dispatch(chat.actions.setAuthorised(false));
                        dispatch(chat.actions.setMessages([]));
                        dispatch(chat.actions.setUnread(0));
                        dispatch(chat.actions.setCreditLoader(true));
                        dispatch(chat.actions.setCredits(0));
                        dispatch(chat.actions.setLoader(true));
                        dispatch(chat.actions.startTimer(false))
                    });
                }).catch((error) => {
                    setAllowSignOut(false)
                    setPopupMessage("The Email or Password is wrong!");
                    handleOpen();
                });
            })

            // MailHandler.SendAccountDeletionNotifAWS(User.Model?.displayName, User.Model?.email).then(() => {
            //     setAllowSignOut(true);
            //     setPopupMessage("Your Account Has Been Deleted. Signing Out.");
            //     handleOpen();
            // })
        } else {
            setAllowSignOut(false);
            setPopupMessage("The Email or Password is wrong!");
            handleOpen();
        }
    }

    return (
        <>
            <div className={`landing-overview ${className}`}>

                <AcountListing />

                <div className='right-overview'>
                    <div className='FixTop-head AccountPage'>
                        <h2>Delete Account</h2>

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
                                                    <label htmlFor="">Email</label>
                                                    <input type="text" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className='col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor="">Password</label>
                                                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                                </div>
                                            </div>

                                            <div className='view-more-btn'>
                                                <Button variant="contained" className="green-btn" onClick={onConfirm}>Delete Account</Button>
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

export default DeleteAccount