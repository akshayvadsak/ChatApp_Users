import React from 'react'
import { MobileView, BrowserView } from 'react-device-detect';
import { IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
type Props = {
    className: string
}
 
const AboutUs: React.FC<Props> = ({ className }) => { 

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
                        <div className='col-lg-5 pe-10'>
                            <div className='BackImg'>
                                <img alt="logo" className='w-100' src='/media/backs/andrea-piacquadio.jpg'/>
                            </div>
                        </div>
                            
                        <div className='col-lg-7'>
                            <div className='CmsTopBanner pb-5'>
                                <h1>About Us</h1>
                                <h3>flirtybum.com is a product of:</h3>
                                <p>PWR Network Limited <br></br> Nicolaou Pantadromos Center, 5th floor, <br></br> Flat/Office 503B, Block B, <br></br> 3026 Limassol <br></br> Cyprus</p>

                                <p>Registration: HE404915</p>
                                <p>VAT: CY10404915G</p>
                                <p>info@flirtybum.com</p>
                            </div>
                        </div>
                    </div>
                        
                    <div className='row pt-10'>
                        <div className='col-lg-12'>
                            <div className='DetaisInner'>
                                <h2>Welcome to flirtybum.com</h2>

                                <p>flirtybum.com is an online entertainment and social networking website where like-minded people chat, flirt, and fulfill their wildest fantasies. Our platform is accessible via desktop, tablet, Smartphone and is 100% discreet.</p>

                                <p>The minimum age for participation on flirtybum.com is at least 18, or above the age of majority in the state where you reside. The site is optimized for desktop, mobile phones and tablets. flirtybum.com is a social platform, for men and women who are looking for a fun, flirty or exciting contact. Every day, hundreds of new members sign up. Based on your profile settings, you will receive match suggestions. However, you can also use our search functions and browse for profiles yourself. This is completely up to you. flirtybum.com is designed for pleasure and entertainment. Fictional entertainers' profiles marked with a heart icon are for entertainment purposes only, physical contact with these profiles is not possible. We strongly advise you to read our Terms and Conditions before using our service.</p>
                                
                                <p>18 U.S.C. 2257 and 2257A Record-keeping Requirements Compliance Statement Any records required to be maintained by the website operator pursuant to 18 U.S.C. §§ 2257 and 2257A and their applicable regulations are kept by the following organization at the following address. PWR Network Limited Souniou 13 Agia Fyla 3116 Limassol Cyprus. All models warrant that they are a consenting adult over the age of eighteen (18) years and the age of majority in her/his legal jurisdiction and have accurately filled out and signed all of the required age verification and models release documents and submitted valid identification.</p>
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

export default AboutUs