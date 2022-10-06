import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import ChatListing from "../../components/ChatListing"
import { Button } from '@mui/material';

import '../../../_metronic/assets/sass/core/vendors/plugins/_fslightbox_default.scss';
import { Profile, ProfileModel } from '../../../client/client/user/Profile';
import { User } from '../../../client/client/user/User';
import { Utils } from '../../../client/client/system/Utils';
import { BrowserView, isTablet } from 'react-device-detect';
import Footer from '../Footer/Footer'
import TopBarRightMenus from './TopBarRightMenus';

type Props = {
    className: string
}

const Favorites: React.FC<Props> = ({ className }) => {
    const history = useHistory();

    const [likedProfiles, setLikedProfiles] = useState<ProfileModel[]>([]);
    const [profiledLikedYou, setProfilesLikedYou] = useState<ProfileModel[]>([]);

    const onProfileClicked = (profile_id: string) => {
        history.push(`/user-profile/${profile_id}`);
    }

    useEffect(() => {
        User.GetUserAccount(User.Model?.uuid).then(() => {
            Profile.GetProfilesByIds(User.Model?.likedProfiles).then((profiles) => {
                setLikedProfiles(profiles);
            })

            Profile.GetProfilesByIds(User.Model?.profilesLikedYou).then((profiles) => {
                setProfilesLikedYou(profiles);
            })
        })
    }, [])

    return (
        <>
            <div className={`landing-overview ${className}`}>

                {!isTablet && <ChatListing />}

                <div className={!isTablet ? 'right-overview' : 'right-overview w-100'}>
                    <div className={!isTablet ? 'FixTop-head' : 'FixTop-head w-100'}>
                        <h2>Favorites</h2>

                        {isTablet &&
                            <ul className='nearby-sublink'>
                                <li>
                                    <Link to={`/landing-pub`}>
                                        <Button variant="text">Home</Button>
                                    </Link>
                                </li>
                                {/* <li><Link to={`/favorites`}><Button variant="text">Favorites</Button></Link></li> */}
                                {/* <li><Link to="#"><Button variant="text">Visitors</Button></Link></li> */}
                                <li>
                                    <Link to={`/my-profile`}>
                                        <Button variant="text"> My Profile</Button>
                                    </Link>
                                </li>
                            </ul>
                        }
                        <BrowserView className='rightNavbar'>
                            <TopBarRightMenus />
                        </BrowserView>
                    </div>

                    <div className='page-body'>
                        <div className='nearby-distance-range-info'>
                            <div className='distance-range'>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="rangeSlider">
                                            <ul className="favTab nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-2">
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        data-bs-toggle="tab"
                                                        href="#kt_tab_pane_1"
                                                    >
                                                        You Liked
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        data-bs-toggle="tab"
                                                        href="#kt_tab_pane_2"
                                                    >
                                                        Liked You
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="kt_tab_pane_1" role="tabpanel" >
                                <div className='row gy-6'>
                                    {
                                        likedProfiles?.map((profile) => {

                                            return (
                                                <div key={`my-likes@${Utils.GenerateRandomID()}`} className='col-xl-2 col-lg-3 col-md-3 col-6'>
                                                    <div className='nearby-profile active ProfileHover' onClick={() => { onProfileClicked(profile.id) }}>
                                                        <img src={profile.photoURL} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div className='col-lg-2 col-6'>
                                        <FsLightbox
                                            toggler={toggler}
                                            sources={[
                                                '/media/avatars/150-1.jpg'
                                            ]}
                                        />
                                        <div className='nearby-profile active ProfileHover' onClick={() => setToggler(!toggler)}>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
                                <div className='row gy-6'>
                                    {
                                        profiledLikedYou?.map((profile) => {

                                            return (
                                                <div key={`liked-me@${Utils.GenerateRandomID()}`} className='col-xl-2 col-lg-3 col-md-3 col-6'>
                                                    <div className='nearby-profile active ProfileHover' onClick={() => { onProfileClicked(profile.id) }}>
                                                        <img src={profile.photoURL} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div>

                                    <div className='col-lg-2 col-6'>
                                        <div className='nearby-profile active ProfileHover'>
                                            <img src='/media/avatars/150-1.jpg' alt="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default Favorites