import React from 'react'
import { Link } from 'react-router-dom'

const today = new Date();
const Footer: React.FC = () => {

    return (
        <>
            <div className="MianFooter">
                <div className='row align-items-center'>
                    <div className='col-xl-6 col-lg-12'>
                        <div className='FooterLinks'>
                            <ul>
                                <li>
                                    <Link to={'/about-us'}>About Us</Link>
                                </li>
                                <li>
                                    <Link to={'/cookies'}>Cookies</Link>
                                </li>
                                <li>
                                    <Link to={'/privacy-policy'}>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/terms-conditions'}>Terms and conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-12'>
                        <div className='copyRight-text'>
                            flirtybum.com &copy; {today.getFullYear()} All rights reserved.
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer