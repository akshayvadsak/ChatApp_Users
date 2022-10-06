import React from 'react'
import { MobileView, BrowserView } from 'react-device-detect';
import { IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
type Props = {
    className: string
}
const today = new Date();
 
const PrivacyPolicy: React.FC<Props> = ({ className }) => { 

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
                                    <h1>Privacy Policy</h1>
                                    </div>
                                
                                <div>
                                    <h4><strong>Privacy Statement</strong></h4>
                                    <p>Welcome to flirtybum.com, operated by PWR Network Limited (“PWR Network Limited,” “we,” “our” or “us”)(“Service”). We provide this Privacy Statement to users of the Service (“you”) to describe the Personal Data (defined below) we collect, how that information may be used, with whom it may be shared, and your choices about such uses and disclosures. We encourage you to read this Privacy Statement carefully before using the Service. By visiting or otherwise using the Service, you consent to PWR Network Limited’s data collection, use, processing and disclosure practices, and other activities, as described in this Privacy Statement, and any additional privacy statements that may be posted on an applicable part of the Service. California residents have certain rights described in paragraph 10.</p>
                                </div>
                                    
                                <div className='pb-5'>
                                    <h4><strong>1. Summary</strong></h4>
                                    <p>I am aware that by filling in my account details, PWR Network Limited will store and process my personal data, in accordance with the Privacy Statement.</p>

                                    <p>This Privacy Statement and our Terms and Conditions outline the manner in which we manage personal information:</p>
                                        
                                    <ul>
                                        <li>1.	Summary</li>
                                        <li>2.	Definitions</li>
                                        <li>3.	Your Account</li>
                                        <li>4.	Your E-Mail Address</li>
                                        <li>5.	Your Payment Details</li>
                                        <li>6.	Automatically Generated Information</li>
                                        <li>7.	Basis of Data Processing</li>
                                        <li>8.	Categories of Personal Data</li>
                                        <li>9.	Your Rights as a User of this Service</li>
                                        <li>10.	Use by Third Parties</li>
                                        <li>11.	International Transfer and Consent to International Processing</li>
                                        <li>12.	Security</li>
                                        <li>13.	Children’s Privacy</li>
                                        <li>14.	Cookies</li>
                                    </ul>
                                </div>
                                    
                                <div>
                                    <h4><strong>2. Definitions</strong></h4>
                                    <p><u>Account:</u> A registration on the Service, which enables Visitors to establish contact with other Profiles;
                                    Device: A computer, mobile, or other internet enabled or permitted device that may be used to access the Service;
                                    GDPR: The General Data Protection Regulation, including the laws implementing this regulation;
                                    Member Database: The database in which member-related data is stored. A member has a personal account and logs in with a unique combination of account name and password; PWR Network Limited. The person responsible for the Service flirtybum.com is PWR Network Limited, registered in Cyprus. HE404915</p>
                                    
                                    <p><u>Personal Data:</u> Information concerning an identified or identifiable natural person, as referred to in the GDPR;
Privacy Statement: This notification to the Visitor regarding the processing of Personal Data concerning him, including the basis for processing of Personal Data of him, the purpose for which this information is processed, what happens to it and with whom it is shared;
Profile: A description of himself, including his personal details and profile picture, as well as the chat history by a visitor on the Service;
Registration: The act whereby a Visitor actively and consciously creates an Account;
Visitor: A natural person who registers on the Service;
                                            Service: The websites and online services of PWR Network Limited that post this Privacy Statement, as well as all underlying pages, features and functionality.</p>
                                        <p>The Service stores and processes all information you provide via the Service. This information includes your account, your messages, images and other generated content, your location data, your payment details and automatically generated information. The basis on which and manner in which this is done will be further elaborated below.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>3. Your account</strong></h4>
                                    <p>Your e-mail address is used to confirm and activate your account, as well as to contact you.</p>
                                    
                                    <p>If you want to use the Member Database, you will have to register as a member. When you create an Account, you will be asked to enter certain information about yourself (username and gender).</p>
                                    
                                    <p>You will be asked to enter a valid e-mail address and password. In your account you can add information about yourself, such as your age, date of birth, place of residence and preferences. The Service asks you for this information in order to best tailor its service to you and to put you in touch with profiles that match preferences. To the extent you provide such personal information to the Service, you expressly authorize us to process and store your Personal Data.</p>
                                    
                                    <p>The information you share can be received by the following categories of recipients:
Data controller: PWR Network Limited, the private company with limited liability, registered as HE404915 and having its principal place of business, Nicolaou Pantadromos Center, 5th floor, Flat/Office 503B, Block B, 3026 Limassol, Cyprus
The developers and administrators of the Service.</p>

                                    <p>The entities are where people are employed who act as controller, some of them coming from countries that may not provide an adequate level of protection for your Personal Data compared to the data in your country. We have, however, entered into binding agreements, and we apply a code of conduct, which we impose on these parties, so that we can comply with comparable levels of data protection.
Moderators and other employees who check for inappropriate content.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>4. Your E-mail Address</strong></h4>
                                        <p>Your e-mail address is used to confirm and activate your account, as well as to contact you.</p>
                                        <p>Your e-mail address will be used to confirm and activate your account, as well as to contact you. You may select any username, as long as it has not yet been created by another user.</p>
                                        <p>We may also use your e-mail address to send you various notifications, relevant suggestions and/or promotional e-mails about the Service.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>5. Your Payment Details</strong></h4>
                                    <p>If you want to make full use of the Member Database, you will need to make purchases. For these purchases, we need your payment details, such as credit card information. This payment account information will only be used to make the payment. If you pay by bank transfer, you will be redirected to your bank's Service. After payment you will be redirected to the Service.</p>
                                </div>
                                
                                <div>
                                    <h4><strong>6. Automatically Generated Information</strong></h4>
                                        <p>Your e-mail address is used to confirm and activate your account, as well as to contact you.</p>
                                        <p>In order for the Service to work optimally (for example, to display pages correctly and to secure the Service), we collect certain information. This information is automatically generated during your use of the Service. This information includes and consists of:</p>
                                        <p>the type of device you use;</p>
                                        <p>the IP address of your device;</p>
                                        <p>the operating system you use;</p>
                                        <p>the browser software you use;</p>
                                        <p>the pages you visit; and</p>
                                        <p>the internet service provider you use.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>7. Basis of Data Processing</strong></h4>
                                        <p>By posting Personal Data to our Service, you make them public and you agree to the Terms and Conditions , and you give explicit permission to PWR Network Limited to process Personal Data. In particular, your race, religion, sexual life, political opinion, health, trade union membership and criminal behavior are considered to be sensitive information, for which you expressly consent.</p>
                                        <p>Personal Data is either offered voluntarily by you to optimize your experience on the Service, or necessary for us to offer you our services in accordance with our Terms and Conditions . The categories of Personal Data, the purposes and the bases are explained in more detail below.</p>
                                </div>
                                    
                                <div>
                                    <h4><strong>8. Categories of Personal Data</strong></h4>
                                        <p>PWR Network Limited will store and process any Personal Data you provide via the Service and you elect to voluntarily provide to them on the Service as and when you do so. There are three categories of Personal Data, each with their own basis and purposes for processing, namely necessary Personal Data, optional Personal Data, and sensitive Personal Data:</p>
                                        
                                        <p>This information is necessary for PWR Network Limited to be able to provide its services. The basis for PWR Network Limited to process it may be found in the Terms and Conditions .</p>

                                        <p>It concerns the following data:</p>
                                        <ul>
                                            <li>• E-mail address</li>
                                            <li>• IP address</li>
                                            <li>• Account name</li>
                                            <li>• Password</li>
                                            <li>• Payment details</li>
                                            <li>• Necessary cookies</li>
                                        </ul>
                                        <p className='mt-5'>We will use this information about you for the following purposes:</p>
                                        <ul>
                                            <li>• Make your use of the Service possible, such as creating an Account, communicating with other users, and sending messages;</li>
                                            <li>• Process payments;</li>
                                            <li>• Sending messages; and</li>
                                            <li>• Send you information about our services and to respond to your questions, feedback, and notifications.</li>
                                        </ul>
                                        <p>Optional Personal Data This information is not strictly necessary for PWR Network Limited to be able to offer its services, but the possibility to share this information is with a view to the quality of the service. The basis for PWR Network Limited to process this may be found in the Terms and Conditions.</p>

                                        <p>It concerns the following data:</p>

                                        <ul>
                                            <li>• Your account information</li>
                                            <li>• Your pictures</li>
                                            <li>• Your messages</li>
                                            <li>• Your preferences</li>
                                            <li>• Cookies that are not strictly necessary, if any</li>
                                        </ul>

                                        <p className='mt-5'>We will use this information about you for the following purposes:</p>
                                        
                                        <ul>
                                            <li>• To optimize the delivery of services offered by this Service. Based on the preferences you have specified, we make suggestions based on preset filters. This way you can find contacts faster and easier.</li>
                                            <li>• Preparing user profiles.</li>
                                            <li>• To customize the Service to your preferences and/or to display personalized offers.</li>
                                            <li>• To draw up anonymous statistical data and to use this data for research purposes.</li>
                                            <li>• To secure, adapt, and improve the Service.</li>
                                            <li>• To provide information about you to third parties, if consent has been given;</li>
                                            <li>• On the basis of legislation and/or regulations.</li>
                                        </ul>

                                        <h4 className='mt-5'>Sensitive Personal Data</h4>
                                        <p>This information is not strictly necessary for PWR Network Limited to be able to offer its services, and relate in particular to your race, religion, sexual life, political opinion, health, membership of a trade union, and criminal law. For this you give permission to PWR Network Limited to process this</p>
                                        <p>The basis for PWR Network Limited to process these is your explicit consent, the Terms and Conditions and/or legitimate interest.</p>

                                        <p>It concerns the following data:</p>

                                        <ul>
                                            <li>• Your sexual orientation</li>
                                            <li>• Your photos, if they contain sensitive Personal Data</li>
                                            <li>• Your messages, if they contain sensitive Personal Data</li>
                                            <li>• Your hobbies, if these contain sensitive Personal Data</li>
                                        </ul>

                                        <p>We will use this information about you for the following purposes:</p>

                                        <ul>
                                            <li>• To optimize the delivery of services offered by this Service. Based on the preferences you have specified, we make suggestions based on preset filters. This way you can find contacts faster and easier.</li>
                                            <li>• Setting up user profiles.</li>
                                            <li>• To customize the Service to your preferences and / or to display personalized offers.</li>
                                        </ul>

                                        <p>In addition, we have taken the following measures to protect your legitimate interests:</p>

                                        <ul>
                                            <li>• Offer you an opt-out if you do not want to share your data anymore</li>
                                            <li>• Protect your data by means of encryption</li>
                                            <li>• Your password will be stored unreadable (hashed)</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                    <h4><strong>9. Your Rights as a User of This Service</strong></h4>
                                        <p>I am aware that by filling in my sexual preference, PWR Network Limited will store and process my personal data.</p>
                                        <p>PWR Network Limited may share any information about you, including, without limitation, Personal Data and non-Personal Data, for any purposes not inconsistent with this Privacy Statement, or our written statements at the point of collection, and otherwise not prohibited by applicable law.</p>
                                        <p>PWR Network Limited may share personal information with third parties for their direct marketing purposes provided that we have your consent to do so. You have the right to withdraw that consent at any time, if applicable. On the Service you will find an area where you can limit the number of messages you can receive, stop receiving messages or Delete your Account. Once closed, we will delete your Personal Data within 12 months, except to retain it as necessary to comply with legal obligations. In the event that you wish your data to be erased immediately, let us know when making the request and we will process your request on an expedited basis. You also have the right to inspect and rectify the data or limit a particular processing, as well as the right to object to a specific processing. Finally, you have the right to transfer your Personal Data to another platform. Accessing, rectifying and transferring your profile can in principle be affected by accessing your own profile, but if that is not possible then you can contact the helpdesk.</p>

                                        <p>On the Service you can ask questions or make announcements regarding the use of the Service. A customer service agent will then contact you to answer your question and/or process your message. To this end, we ask you to provide the following information:</p>

                                        <ul>
                                            <li>• email address;</li>
                                            <li>• subject of your message;</li>
                                            <li>• a description of your question / message;</li>
                                            <li>• attachments (optional)</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                    <h4><strong>10. Use by Third Parties</strong></h4>
                                        <p>If you provide Personal Data to this Service, this information will not be shared with third parties, except and to the extent that this is clear from this Privacy Statement. Beware that if you post Personal Data to public facing portions of the Service, or share it with others through messaging services, it will be available to third parties. Exercise good judgment when doing so and we recommend that you limit the Personal Data you share in this manner. We are not responsible for your interactions with other users of the Service or how other users of the Service will use Personal Data you make available to them and we do not undertake any background checks on, or otherwise make efforts to verify the identity or character of, Service users.</p>
                                        <p>We may provide your Personal Data to third parties insofar as you have explicitly given permission for this, as well as when this is required for the use of the Service. This includes data collected by the Service (automatically), such as your IP or MAC address, the type of browser, and the software and hardware you use. This data is shared with Google Analytics and 24metrics, two external service providers, to ensure that the Service functions properly.</p>
                                        <p>The Service may include hyperlinks to, or include on or in connection with, other websites, locations, platforms, applications or online services operated by third parties (“Third-Party Services”). These Third-Party Services may use their own cookies, web beacons, and other tracking technologies to independently collect information about you and may solicit Personal Data from you. We are not responsible for, and make no representations regarding, the policies or business practices of any third parties, including, without limitation, Third-Party Services associated with the Service. We encourage you to familiarize yourself with and consult their privacy policies and Terms and Conditions.</p>
                                        <p>Finally, we may provide your personal information to third parties if we are required to do so on the basis of laws and/or regulations, we are obliged to do so as a result of a lawsuit, and/or if we consider this necessary to protect our rights.</p>
                                    </div>
                                    <div>
                                        <h4><strong>11. Security</strong></h4>
                                        <p>To prevent unauthorized access, we have taken appropriate security measures to protect and secure the information you have provided. However, no online or digital security is absolute. If you register with us or create an Account, you are responsible and liable for the security and confidentiality of your access credentials and for restricting access to your Device and for all activity under your account.</p>
                                    </div>

                                    <div>
                                        <h4><strong>12. International Transfer and Consent to International Processing</strong></h4>
                                        <p>Although the Service is directed to and intended only for users in the United Kingdom, PWR Network Limited is a growing company operated out of Cyprus and multiple other countries in the European Union and otherwise, and we operated the Service from our the Services largely outside of the U.S.; provided, however, that we may use servers in the U.S. to help us more effectively serve you content and operate the Service. We apply the European Union’s General Data Protection Regulation to data that is processed and stored in the European Union, but also provide U.S. data subjects any privacy rights required to be accorded them under applicable U.S. law. Generally, the GDPR will provide data subjects greater rights that accorded under U.S. privacy laws. Your use of the Service constitutes your consent to your Personal Data and other information being collected in and outside of the United States and transferred to and processed and stored in the European Union and other jurisdictions inside and outside of the U.S.</p>
                                    </div>

                                    <div>
                                        <h4><strong>13. Children’s Privacy</strong></h4>
                                        <p>The Service is intended for a mature audience. We do not intend to collect personal information as defined by the U.S. Children’s Privacy Protection Act. If you are under the age of eighteen (18), or otherwise under the age of majority where you reside (19 or 21 in some states) then you are not permitted to register as a user, create an Account or otherwise use the Service or submit personal information to us. In the event we are informed that we have obtained a child’s personal information we will delete it, or otherwise take appropriate action, as required by applicable law.</p>
                                    </div>

                                    <div>
                                        <h4><strong>14. Cookie and Tracking Technologies Statement</strong></h4>
                                        <p>What are Cookies</p>
                                        <p>Cookies are small pieces of information that are sent to your browser when you visit the Service and are then stored on the hard disk or in the memory of the peripheral equipment. The browser can return this information on a subsequent visit to the Service. The cookies placed via this Service cannot damage your peripherals or the files stored on them.</p>

                                        <p>Cookies from the Service</p>
                                        <p>The Service uses cookies that it self-reads. No third parties are involved in the placement and reading of these so-called first party cookies. Service places functional cookies in the first place. These cookies are necessary to be able to deliver the requested service. For example, functional cookies ensure that, after you have accepted the use of cookies, you no longer see the screen indicating that the Service uses cookies. These functional cookies are not covered by cookie law and we are therefore not obliged to inform you about this. However, we do this because we want to be transparent about the use of all cookies. In addition to functional cookies, flirtybum.com places cookies to remember your search results during a session. These session cookies facilitate your use of the Service. The cookies are deleted again when you end your browser session.</p>

                                        <p>Analytical Cookies</p>
                                        <p>To collect web statistics about the use and visit of the Service, the Service uses Google Analytics. Google Analytics places a permanent cookie on your Peripheral Equipment, on the basis of which your use of the Service is registered. This data is then analyzed by Google and the results are provided to the Service. In this way the Service obtains insight into the way in which the Service is used and, on the basis of that information, can make adjustments to the Service or its services if necessary. Google may provide this information to third parties if it is legally bound to do so and/or if third parties process the information on behalf of Google. Google cannot use the information for other Google services. We have completely anonymized the cookies of Google Analytics and therefore we may place these without permission.</p>

                                        <p>Tracking</p>
                                        <p>Some information about your use of the Service and certain third-party services may be collected using tracking technologies across time and services, and used by us and third parties for purposes such as to associate different devices you use, and deliver relevant ads and/or other content to you on the Service and certain third-party sites and services.</p>

                                        <p>Delete cookies</p>
                                        <p>The consent you have given to us for the placement and reading of cookies, you can withdraw at any time by setting your browser so that it does not accept cookies and/or by removing all cookies already placed in your browser. You have to take into account that the removal of cookies may result in certain parts of the Service not working or working properly.</p>

                                        <p>Privacy declaration</p>
                                        <p>It is possible that the information gathered by means of a cookie or otherwise read out contains Personal Data. If this is the case, this Privacy Statement of the Service applies to the processing of this Personal Data.</p>

                                        <p>Amendments</p>
                                        <p>This Cookie Statement can be changed at any time. Changes to this Cookie Statement will be made known via the Service.</p>

                                        <p>Ask</p>
                                        <p>If you have any questions about this Cookie Statement you can send an e-mail to info@flirtybum.com</p>

                                        <p>The minimum age for participation on flirtybum.com is at least 18, or above the age of majority in the state where you reside. The site is optimized for desktop, mobile phones and tablets. flirtybum.com is a social platform, for men and women who are looking for a fun, flirty or exciting contact. Every day, hundreds of new members sign up. Based on your profile settings, you will receive match suggestions. However, you can also use our search functions and browse for profiles yourself. This is completely up to you. flirtybum.com is designed for pleasure and entertainment. Fictional entertainers' profiles marked with a heart icon are for entertainment purposes only, physical contact with these profiles is not possible. We strongly advise you to read our Terms and Conditions before using our service.</p>

                                        <p>18 U.S.C. 2257 and 2257A Record-keeping Requirements Compliance Statement
Any records required to be maintained by the website operator pursuant to 18 U.S.C. §§ 2257 and 2257A and their applicable regulations are kept by the following organization at the following address. PWR Network Limited Souniou 13 Agia Fyla 3116 Limassol Cyprus.
                                            All models warrant that they are a consenting adult over the age of eighteen (18) years and the age of majority in her/his legal jurisdiction and have accurately filled out and signed all of the required age verification and models release documents and submitted valid identification.</p>
                                        
                                        <p>PWR Network Limited</p>
                                        <p>Souniou 13 Agia Fyla 3116 Limassol Cyprus</p>
                                        <p>Terms & Conditions Privacy Statement Cookies Pricing About Us Contact Login</p>
                                        <p>flirtybum.com (c) {today.getFullYear()} All rights reserved.</p>
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

export default PrivacyPolicy