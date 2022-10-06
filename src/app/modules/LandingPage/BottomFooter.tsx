import { Link } from 'react-router-dom';
import React from 'react'
import * as chat from '../apps/chat/ChatRedux'
import { useDispatch } from 'react-redux';
import { User } from '../../../client/client/user/User';

const BottomFooter = () => {
    const dispatch = useDispatch();
    const logout = () => {
        User.SignOut().then(() => {
            dispatch(chat.actions.setAuthorised(false));
            dispatch(chat.actions.setMessages([]));
            dispatch(chat.actions.setUnread(0));
            dispatch(chat.actions.setCreditLoader(true));
            dispatch(chat.actions.setCredits(0));
            dispatch(chat.actions.setLoader(true));
            dispatch(chat.actions.startTimer(false))
        })
    }
    return (
        <>
            <div className=''>
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

export default BottomFooter