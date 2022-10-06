import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import { RootState } from '../../../setup';
import { shallowEqual, useSelector } from 'react-redux';
import { Analytics, AnalyticsUIId } from '../../../client/client/system/Analytics';
import { UserModel } from '../auth/models/UserModel';
import { User } from '../../../client/client/user/User';
import { Chat } from '../../../client/client/chat/Chat';

const TopBarRightMenus = () => {
    const credits = useSelector((state: RootState) => state.chat.credits);
    const creditLoaded = useSelector((state: RootState) => state.chat.creditLoader);

    return (
        <>
            <div className=''>
                <ul className='nearby-sublink'>
                    <li>
                        <Link to={`#`} data-bs-toggle="modal" data-bs-target="#kt_modal_1">
                            <Button variant="text"> Credits : {!creditLoaded ? credits : "Loading"}</Button>
                        </Link>
                    </li>

                    <li>
                        <Link to={`/favorites`}>
                            <Button variant="text">Favorites</Button>
                        </Link>
                    </li>

                    {/* <li><Link to="#"><Button variant="text">Visitors</Button></Link></li> */}
                    <li>
                        <Link to={`/my-profile`}>
                            <Button variant="text">{User.Model.displayName}</Button>
                        </Link>
                    </li>

                    <li className="PaymentBtn">
                        <Link to={`#`} onClick={() => { Chat.SendGetCreditsFeedEntry();Analytics.SendUIAnalyticsEvent(AnalyticsUIId.BTN_CREDITS) }} data-bs-toggle="modal" data-bs-target="#kt_modal_1">
                            <Button variant="text"> Credits</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TopBarRightMenus