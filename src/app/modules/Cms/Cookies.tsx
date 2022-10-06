import React from 'react'
import { MobileView, BrowserView } from 'react-device-detect';
import { IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
type Props = {
    className: string
}
 
const Cookies: React.FC<Props> = ({ className }) => { 

    return (
    <>
        <div className={`landing-overview ${className} outerpages`}>
            {/* <ChatListing /> */}
            <div className='right-overview w-100'>
                <BrowserView>
                  <div className='FixTop-head w-100'>
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
                     <div className="sidechat-top-bnts PaymentBtn">
                            <Link to={`/landing-pub`}>
                            <Button variant="text" size='large'> Home</Button>
                              {/* <IconButton color="error">
                                 <i className="fas fa-home"></i>
                              </IconButton> */}
                                    </Link>
                                    </div>
                     </BrowserView>
                  </div>
               </BrowserView>

               <MobileView>
                  <div className='FixTop-head w-100'>
                     <div className='logoflirty'>
                        <img alt="logo" src='/media/logos/flirtybum-white.png' className='h-50px' />
                     </div>
                            <div className="sidechat-top-bnts">
                            <Link to={`/landing-pub`}>
                              <IconButton color="error">
                                 <i className="fas fa-home"></i>
                              </IconButton>
                                    </Link>
                                    </div>
                  </div>
               </MobileView>

                <div className='page-body pt-15'>
                    <div className='row'>
                        <div className='col-lg-12'>
                                <div className='DetaisInner'>
                                    <div className='PageTitleInner'>
                                    <h1>Cookie</h1>
                                    </div>
                                
                                <div>
                                    <h4><strong>Cookie Statement</strong></h4>
                                    <p>This Cookie Statement of the website flirtybum.com explains how cookies are placed on the website of flirtybum.com and its affiliated partners and information is read from your computer, tablet and / or mobile phone (hereinafter: "Peripherals"). This Cookie Statement also states the purposes for which this collected information is used. We therefore recommend that you read this Cookie Statement carefully.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>What are cookies</strong></h4>
                                    <p>flirtybum.com uses cookies that it self-reads. No third parties are involved in the placement and reading of these so-called first party cookies. </p>

                                    <p>Cookies are small pieces of information that are sent to your browser when you visit the Service and are then stored on the hard disk or in the memory of the peripheral equipment. The browser can return this information on a subsequent visit to the Service. The cookies placed via this Service cannot damage your peripherals or the files stored on them.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Cookies from the Service</strong></h4>
                                    <p>The Service uses cookies that it self-reads. No third parties are involved in the placement and reading of these so-called first party cookies. Service places functional cookies in the first place. These cookies are necessary to be able to deliver the requested service. For example, functional cookies ensure that, after you have accepted the use of cookies, you no longer see the screen indicating that the Service uses cookies. These functional cookies are not covered by cookie law and we are therefore not obliged to inform you about this. However, we do this because we want to be transparent about the use of all cookies. In addition to functional cookies, flirtybum.com places cookies to remember your search results during a session. These session cookies facilitate your use of the Service. The cookies are deleted again when you end your browser session.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Analytical cookies</strong></h4>
                                    <p>To collect web statistics about the use and visit of the Service, the Service uses Google Analytics. Google Analytics places a permanent cookie on your Peripheral Equipment, on the basis of which your use of the Service is registered. This data is then analyzed by Google and the results are provided to the Service. In this way the Service obtains insight into the way in which the Service is used and, on the basis of that information, can make adjustments to the Service or its services if necessary. Google may provide this information to third parties if it is legally bound to do so and/or if third parties process the information on behalf of Google. Google cannot use the information for other Google services. We have completely anonymized the cookies of Google Analytics and therefore we may place these without permission.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Tracking</strong></h4>
                                    <p>Some information about your use of the Service and certain third-party services may be collected using tracking technologies across time and services, and used by us and third parties for purposes such as to associate different devices you use, and deliver relevant ads and/or other content to you on the Service and certain third-party sites and services.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Delete cookies</strong></h4>
                                    <p>The consent you have given to us for the placement and reading of cookies, you can withdraw at any time by setting your browser so that it does not accept cookies and/or by removing all cookies already placed in your browser. You have to take into account that the removal of cookies may result in certain parts of the Service not working or working properly.</p>
                                </div>
                                
                                <div>
                                    <h4><strong>Privacy declaration</strong></h4>
                                    <p>It is possible that the information gathered by means of a cookie or otherwise read out contains Personal Data. If this is the case, this Privacy Policy of the Service applies to the processing of this Personal Data.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Amendments</strong></h4>
                                    <p>This Cookie Statement can be changed at any time. Changes to this Cookie Statement will be made known via the Service.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>Ask</strong></h4>
                                        <p>If you have any questions about this Cookie Statement you can send an e-mail to info@flirtybum.com</p>
                                        
                                        <p>The minimum age for participation on flirtybum.com is at least 18, or above the age of majority in the state where you reside. The site is optimized for desktop, mobile phones and tablets. flirtybum.com is a social platform, for men and women who are looking for a fun, flirty or exciting contact. Every day, hundreds of new members sign up. Based on your profile settings, you will receive match suggestions. However, you can also use our search functions and browse for profiles yourself. This is completely up to you. flirtybum.com is designed for pleasure and entertainment. Fictional entertainers' profiles marked with a heart icon are for entertainment purposes only, physical contact with these profiles is not possible. We strongly advise you to read our Terms and Conditions before using our service.</p>

                                        <p>18 U.S.C. 2257 and 2257A Record-keeping Requirements Compliance Statement
                                        Any records required to be maintained by the website operator pursuant to 18 U.S.C. §§ 2257 and 2257A and their applicable regulations are kept by the following organization at the following address. PWR Network Limited Souniou 13 Agia Fyla 3116 Limassol Cyprus.
                                        All models warrant that they are a consenting adult over the age of eighteen (18) years and the age of majority in her/his legal jurisdiction and have accurately filled out and signed all of the required age verification and models release documents and submitted valid identification
                                        </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    </div> 

                <Footer />    
            </div>
        </div>
    </>
    )
}

export default Cookies