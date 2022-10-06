import React, { useEffect, useState, useRef, useCallback } from 'react'
import { User, UserModel } from '../../../client/client/user/User';
import AcountListing from "../../components/AcountListing"
import { Button, IconButton, Snackbar, styled, } from '@mui/material';
import CountriesV2 from '../../../client/client/system/CountriesV2';
import { UserImageModel } from '../../../_metronic/helpers';
import { Utils } from '../../../client/client/system/Utils';
import { FileHandler } from '../../../client/client/system/FileHandler';
import ReactCrop, {
   centerCrop,
   makeAspectCrop,
   Crop,
   PixelCrop,
} from 'react-image-crop'
import { canvasPreview, getCroppedImg } from './../../../client/client/system/CanvasPreview'
import { useDebounceEffect } from './../../../client/client/system/useDebounceEffect'
import { Link } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css'
import HandOverPopup from '../HandOverPopUp/HandOverPopUp'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Footer from '../Footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import * as chat from './../../modules/apps/chat/ChatRedux'
import { useDispatch } from 'react-redux';
import { isMobile, isTablet } from 'react-device-detect';
import BottomFooter from './BottomFooter';
import TopBarRightMenus from './TopBarRightMenus';
import Coin from '../../../assets/images/dollar.png'
import FsLightbox from 'fslightbox-react';
import '../../../_metronic/assets/sass/core/vendors/plugins/_fslightbox_default.scss';

type Props = {
   className: string
}

const UserProfile: React.FC<Props> = ({ className }) => {
   const [userModel, setUserModel] = useState<UserModel>(null as any);
   const dispatch = useDispatch()
   const [profilePhoto, setProfilePhoto] = useState<string>("");
   const [profileLoading, setProfileLoading] = useState<boolean>(false)

   const [name, setName] = useState<string>("");
   const [gender, setGender] = useState<string>("");
   const [birthday, setBirthday] = useState<string>("");
   const [country, setCountry] = useState<string>("");

   const [aboutMe, setAboutMe] = useState<string>("");
   const [lookingFor, setLookingFor] = useState<string>("");

   const [privateImages, setPrivateImages] = useState<UserImageModel[]>([]);
   const [publicImages, setPublicImages] = useState<UserImageModel[]>([]);
   const [publicLoading, setPublicLoading] = useState<boolean>(false);
   const [privateLoading, setPrivateLoading] = useState<boolean>(false);

   const [height, setHeight] = useState<number>(null as any)
   const [weight, setWeight] = useState<number>(null as any);
   const [maritalStatus, setMaritalStatus] = useState<string>("");
   const [bodyType, setBodyType] = useState<string>("");
   const [ethnicity, setEthnicity] = useState<string>("");
   const [hairColor, setHairColor] = useState<string>("");
   const [eyeColor, setEyeColor] = useState<string>("");
   const [sexualOrientation, setSexualOrientation] = useState<string>("");
   const [language, setLanguage] = useState<string>("");

   const [open, setOpen] = useState<boolean>(false);
   const [snackOpen, setSnackOpen] = useState(false)
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [popupMessage, setPopupMessage] = useState<string>("");
   const [confirmAction, setConfirmAction] = useState<any>();

   const [imgSrc, setImgSrc] = useState('')
   const handleCloseCropper = () => setImgSrc("");

   const previewCanvasRef = useRef<HTMLCanvasElement>(null)
   const imgRef = useRef<HTMLImageElement | null>(null)
   const [crop, setCrop] = useState<Crop>()
   const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
   const [scale, setScale] = useState(1)
   const [rotate, setRotate] = useState(0);
   const [imageUrl, setImageUrl] = useState() as any;
   const [fileName, setFileName] = useState() as any;
   const [forceInfoUpdate, setForceInfoUpdate] = useState<boolean>(false);
   const [forcePublicUpdate, setForcePublicUpdate] = useState<boolean>(false);
   const [forcePrivateUpdate, setForcePrivateUpdate] = useState<boolean>(false);

   const [updateOnlyPhoto, setUpdateOnlyPhoto] = useState<boolean>(false);
   const [progress, setProgress] = useState(0);
   const [firstTimeComplete, setFirstTimeComplete] = useState(false);

   const [toggler, setToggler] = useState(false);
   const [lightboxIndex, setLightboxIndex] = useState<number>(0);
   const [lightboxSources, setLightboxSources] = useState<string[]>([]);


   const [togglerprivate, setTogglerprivate] = useState(false);
   const [lightboxIndexprivate, setLightboxIndexprivate] = useState<number>(0);
   const [lightboxSourcesprivate, setLightboxSourcesprivate] = useState<string[]>([]);

   const toggleLightbox = (toggle: boolean, index: number) => {
      setLightboxIndex(index);
      setToggler(toggle);
   }

   const toggleLightboxprivate = (toggle: boolean, index: number) => {
      setLightboxIndexprivate(index);
      setTogglerprivate(toggle);
   }


   const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '85%',
      maxWidth: '400px',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 3,
      background: "#24222D"
   };

   function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      imgRef.current = e.currentTarget

      const { width, height } = e.currentTarget

      // This is to demonstate how to make and center a % aspect crop
      // which is a bit trickier so we use some helper functions.
      const crop = centerCrop(
         makeAspectCrop(
            {
               unit: '%',
               width: 80,
            },
            1 / 1,
            width,
            height,
         ),
         height,
         width,
      )

      setCrop(crop)
   }

   useDebounceEffect(
      async () => {
         if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
         ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
               imgRef.current,
               previewCanvasRef.current,
               completedCrop,
               scale,
               rotate,
            )
         }
      },
      100,
      [completedCrop, scale, rotate],
   )

   function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files.length > 0) {
         setFileName(e.target.files[0].name);
         setCrop(undefined) // Makes crop preview update between images.
         const reader = new FileReader();
         reader.addEventListener('load', () => {
            setImgSrc(reader!.result!.toString() || '')
         })
         reader.readAsDataURL(e.target.files[0])
      }
   }

   const openPopup = useCallback((message: string, confirmAction: () => void | null) => {
      //alert("here")
      setPopupMessage(message);
      setConfirmAction(() => confirmAction);
      handleOpen();
   }, [])

   const uploadProfileImage = () => {
      let files = imageUrl;

      // if (!files.length)
      //    return;

      let onLoad = (file: any) => {
         addProfileImage(file)
      }

      setImgSrc("");
      setProfileLoading(true);
      FileHandler.ReadImageFile(files, onLoad);
   }

   const getImageFromCrop = (crop: any) => {
      if (imgRef) {
         getCroppedImg(imgRef.current, crop, 'newFile.jpg').then(res => setImageUrl(res));
      }

   }

   const uploadPublicPhotos = (e: any) => {
      let files = e.target.files;
      let readers = [];
      let outputs: any[] = [];

      if (!files.length)
         return;

      let onLoad = (file: any) => {
         outputs.push(file);
      }

      for (let i = 0; i < files.length; i++) {
         readers.push(FileHandler.ReadImageFile(files[i], onLoad));
      }

      setPublicLoading(true);
      Promise.all(readers).then((values) => {
         User.AddUserImages(outputs, "public", () => {
            //("Successfully Added Photos!");
            setForcePublicUpdate(!forcePublicUpdate);
         }, () => {
            //alert("Failed to Add Photos!");
            const confirmAction = () => {

            };
            openPopup("Failed to Add Public Photos", confirmAction);
         })
      })
   }

   const uploadPrivatePhotos = (e: any) => {
      let files = e.target.files;
      let readers = [];
      let outputs: any[] = [];

      if (!files.length)
         return;

      let onLoad = (file: any) => {
         outputs.push(file);
      }

      for (let i = 0; i < files.length; i++) {
         readers.push(FileHandler.ReadImageFile(files[i], onLoad));
      }

      setPrivateLoading(true);
      Promise.all(readers).then((values) => {
         User.AddUserImages(outputs, "private", () => {
            //alert("Successfully Added Photos!");
            setForcePrivateUpdate(!forcePrivateUpdate);
         }, () => {
            //alert("Failed to Add Photos!");
            const confirmAction = () => {

            };
            openPopup("Failed to Add Private Photos", confirmAction);
         })
      })
   }

   const deleteImageFromStorage = (reference: string, onSuccess: () => void | null, onFail: () => void | null) => {
      FileHandler.DeleteFile(reference, () => {
         onSuccess();
      }, () => {
         onFail();
      });
   }

   const removeProfileImage = () => {
      let params = {
         photoURL: "",
         profileReference: ""
      }

      deleteImageFromStorage(userModel?.profileReference, () => {
         User.UpdateUserAccount(userModel?.uuid, params).then(() => {
            //alert("Successfully Removed the Profile Image!");
            // Utils.RefreshPage();
            setUpdateOnlyPhoto(true);
            setForceInfoUpdate(!forceInfoUpdate);
         });
      }, () => {
      });
   }

   const removeProfilePhoto = (imageId: string, reference: string, imageType: string) => {
      deleteImageFromStorage(reference, () => {
         User.DeleteUserImage(imageId).then(() => {
            //alert("Successfully Deleted Image!");
            if (imageType === "public")
               setForcePublicUpdate(!forcePublicUpdate);
            else if (imageType === "private")
               setForcePrivateUpdate(!forcePrivateUpdate)
         });
      }, () => {

      });
   }

   const addProfileImage = async (file: any) => {
      let fileDetails = fileName.split('.');
      let newName = fileDetails[0] + Utils.GenerateRandomID() + '.' + fileDetails[1];
      await User.ModifyProfilePhoto(newName, file, () => {
         //alert("Successfully Added New Profile Image!");
         //Utils.RefreshPage();
         setUpdateOnlyPhoto(true);
         setForceInfoUpdate(!forceInfoUpdate);
      }, () => {
         //alert("Failed to Upload New Profile Image!");
         const confirmAction = () => {

         };
         openPopup("Failed to Upload New Profile Image", confirmAction);
      })
   }

   const setDefaultPhoto = (profileUrl: string) => {
      setProfilePhoto(profileUrl);
      setProfileLoading(false);
   };

   const setDefault = (model: UserModel) => {
      // setProfilePhoto(model.photoURL);
      setName(model.displayName ? model.displayName : "");
      setGender(model.gender ? model.gender : "");
      setBirthday(model.birthday ? model.birthday : "");
      setCountry(model.country ? model.country : "");

      setAboutMe(model.aboutMe ? model.aboutMe : "");
      setLookingFor(model.lookingFor ? model.lookingFor : "");

      setHeight(model.height ? model.height : 0);
      setWeight(model.weight ? model.weight : 0);
      setMaritalStatus(model.maritalStatus ? model.maritalStatus : "");
      setBodyType(model.bodyType ? model.bodyType : "");
      setEthnicity(model.ethnicity ? model.ethnicity : "");
      setHairColor(model.hairColor ? model.hairColor : "");
      setEyeColor(model.eyeColor ? model.eyeColor : "");
      setSexualOrientation(model.sexualOrientation ? model.sexualOrientation : "");
      setLanguage(model.language ? model.language : "");
   }

   const saveUserInfoChanges = async () => {
      let userData: any = {
         displayName: name,
         gender: gender,
         birthday: birthday,
         maritalStatus: maritalStatus,
         height: height,
         weight: weight,
         bodyType: bodyType,
         ethnicity: ethnicity,
         hairColor: hairColor,
         eyeColor: eyeColor,
         sexualOrientation: sexualOrientation,
         country: country,
         language: language,
         lookingFor: lookingFor,
         aboutMe: aboutMe,
      }

      let copyUser: any = { ...userData };
      console.log(copyUser)
      //userData.isProfileCompleted=false

      if (publicImages.length > 0 && privateImages.length > 0) {
         let totalKeys = Object.keys(copyUser).length + 2
         let notFilled = Object.keys(copyUser).filter((k) => copyUser[k] === "").length;

         let percentage = (totalKeys - notFilled) / totalKeys * 100;
         if (!userModel.isProfileCompleted) {
            if (percentage === 100) {
               userData.isProfileCompleted = true;

            } else {
               userData.isProfileCompleted = false
            }
         }

      } else {
         copyUser.publicImages = publicImages.length > 0 ? publicImages : "";
         copyUser.privateImages = privateImages.length > 0 ? privateImages : "";
         let totalKeys = Object.keys(copyUser).length
         let notFilled = Object.keys(copyUser).filter((k) => copyUser[k] === "").length;

         let percentage = (totalKeys - notFilled) / totalKeys * 100;
         if (!userModel.isProfileCompleted) {
            if (percentage === 100) {
               userData.isProfileCompleted = true;
            }
         }
      }
      await User.UpdateUserAccount(userModel?.uuid, userData).then(() => {
           setPopupMessage("Saved successfully!!")
         //const confirmAction = () => {
            setSnackOpen(true);
            setUpdateOnlyPhoto(false);
            setForceInfoUpdate(!forceInfoUpdate)
            if (userData.isProfileCompleted) {
               setFirstTimeComplete(true);
            }
            setTimeout(() => {
               setSnackOpen(false)
            }, 1000);
         //};
         //openPopup("Your Changes Have Been Saved", confirmAction);

      })
   }

   const Input = styled('input')({
      display: 'none',
   });

   useEffect(() => {
      setProfileLoading(true);
      User.GetUserAccount(User.Model?.uuid).then((model) => {
         if (model) {
            setUserModel(model);

            setDefaultPhoto(model.photoURL);

            
               setDefault(model);
         }
      });
   }, [])

   useEffect(()=>{
      User.GetUserAccount(User.Model?.uuid).then((model) => {
         if (model) {
            setUserModel(model);
            if(updateOnlyPhoto)
            setDefaultPhoto(model.photoURL);

            if(!updateOnlyPhoto)
            setDefault(model);
         }
      });
   },[forceInfoUpdate, updateOnlyPhoto])

   useEffect(() => {
      setPublicLoading(true);
      User.GetAllUserImages("public").then((images) => {
         if (images) {
            let publicimages: string[] = [];
            images.forEach((item) => {
               publicimages.push(item.info.photoURL)
            })
            setPublicImages(images);
            setPublicLoading(false);
            setLightboxSources(publicimages);
         }
      });
   }, [forcePublicUpdate])

   useEffect(() => {
      setPrivateLoading(true);
      User.GetAllUserImages("private").then((images) => {
         if (images) {
            let privateimages: string[] = [];
            images.forEach((item) => {
               privateimages.push(item.info.photoURL)
            })
            setPrivateImages(images);
            setPrivateLoading(false);
            setLightboxSourcesprivate(privateimages);
         }
      });
   }, [forcePrivateUpdate]);

   useEffect(() => {
      let obj: any = {}
      if (userModel) {
         obj = {
            name: userModel.displayName ? userModel.displayName : "",
            gender: userModel.gender ? userModel.gender : "",
            birthday: userModel.birthday ? userModel.birthday : "",
            country: userModel.country ? userModel.country : "",
            aboutMe: userModel.aboutMe ? userModel.aboutMe : "",
            lookingFor: userModel.lookingFor ? userModel.lookingFor : "",
            height: userModel.height ? userModel.height : "",
            weight: userModel.weight ? userModel.weight : "",
            maritalStatus: userModel.maritalStatus ? userModel.maritalStatus : "",
            bodyType: userModel.bodyType ? userModel.bodyType : "",
            ethnicity: userModel.ethnicity ? userModel.ethnicity : "",
            hairColor: userModel.hairColor ? userModel.hairColor : "",
            eyeColor: userModel.eyeColor ? userModel.eyeColor : "",
            sexualOrientation: userModel.sexualOrientation ? userModel.sexualOrientation : "",
            language: userModel.language ? userModel.language : "",
            publicImages: "",
            privateImages: ""
         }
         if (publicImages.length > 0) {
            obj.publicImages = publicImages
         }
         if (privateImages.length > 0) {
            obj.privateImages = privateImages
         }
         let totalKeys = Object.keys(obj).length
         let notFilled = Object.keys(obj).filter((k) => obj[k] === "").length;

         let percentage = (totalKeys - notFilled) / totalKeys * 100;
         setProgress(percentage)
      }


   }, [privateImages, publicImages, userModel, firstTimeComplete])

   useEffect(() => {
      if (firstTimeComplete) {
       //  alert("congrats on your profile completion")
         User.AddCredits(21).then((credits) => {
            dispatch(chat.actions.setCredits(credits))
         });
         const confirmAction = () => {
            setOpen(false);
            
            openPopup("Congrats on your profile completion", ()=>setOpen(false));
         };
         openPopup("Congrats on profile completion 21 credits have been added to your account!", confirmAction);
      }

   }, [dispatch, firstTimeComplete, openPopup])


   return (
      <>
         <FsLightbox
            toggler={toggler}
            sources={lightboxSources}
            sourceIndex={lightboxIndex}
            showThumbsOnMount={true}
         />

         <FsLightbox
            toggler={togglerprivate}
            sources={lightboxSourcesprivate}
            sourceIndex={lightboxIndexprivate}
            showThumbsOnMount={true}
         />

         <div className={`landing-overview ${className}`}>

            <AcountListing />

            <div className="right-overview">
               <div className="FixTop-head">
                  <h2>My Profile</h2>

                  {!isMobile && <div className='view-more-btn rightHeader rightNavbar'>
                     <TopBarRightMenus />
                  </div>}

               </div>
               <div className='page-body'>
                  <div className='row mb-10'>
                     <div className='col-lg-12'>

                        <div className='pt-5'>
                           <p>Complete your profile and get 14 FREE chat credits <img src={Coin} width="15" alt="Coin" /></p>
                        </div>

                        <div className='d-flex align-items-center gap-5 pb-5'>
                           <LinearProgress color="success" className='my-2' sx={{ height: '8px', width: '100%', borderRadius: 5 }} variant="determinate" value={Math.floor(progress)} />

                           <div>{progress.toFixed(0)}%</div>
                        </div>

                        <div className='profile-overview pt-0'>
                           <div className='user-info userProfile-block'>



                              <div className='updateProfile'>
                                 {/* <img src="/media/avatars/150-2.jpg" alt="" id="profileImg" /> */}
                                 {
                                    !profileLoading ?
                                       profilePhoto ?
                                          <img src={profilePhoto} alt="ProfilePic" id="profileImg" />
                                          :
                                          <i className="material-icons profile-placeholder">photo_camera</i>
                                       :
                                       <div className="spinnerLoder"><CircularProgress /></div>
                                 }
                                 {/*onChange={uploadProfileImage}% */}
                                 <input type="file" accept="image/*" id="profileUpdate" onChange={onSelectFile} />

                                 <div className='addRemove-profileBtn'>
                                    <IconButton color="error">
                                       <label htmlFor="profileUpdate">
                                          <i className="material-icons">add</i>
                                       </label>
                                    </IconButton>

                                    <IconButton color="error" className='remove-btn' data-bs-toggle="modal"
                                       data-bs-target="#Profile_Alert">
                                       <i className="material-icons">close</i>
                                    </IconButton>

                                 </div>
                              </div>
                           </div>

                           <div className='about-user profileInputs'>
                              <div className='row'>
                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Name</label>
                                       <input type="text" placeholder='Enter Name' onBlur={saveUserInfoChanges} value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Gender</label>
                                       <select value={gender} onBlur={saveUserInfoChanges} onChange={(e) => setGender(e.target.value)} aria-label="Select example">
                                          <option disabled value="">Select Gender</option>
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                          <option value="Other">Other</option>
                                       </select>
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group birth-row'>
                                       <label htmlFor="">Date Of Birth</label>
                                       <input type="date" max="9999-12-31" value={birthday} onBlur={saveUserInfoChanges} onChange={(e) => { setBirthday(e.target.value) }} />
                                    </div>
                                 </div>

                                 <div className='col-lg-12'>
                                    <div className='form-group'>
                                       <label htmlFor="">Country</label>
                                       <select value={country} onBlur={saveUserInfoChanges} onChange={(e) => setCountry(e.target.value)} aria-label="Select example">
                                          <option disabled value="">Select</option>
                                          <CountriesV2 />
                                       </select>
                                       {/* <input type="text" placeholder='Height' value={country} onChange={(e) => { setCountry(e.target.value) }} /> */}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='row mb-10'>
                     <div className='col-lg-12'>
                        <div className='about-user profileInputs'>
                           <div className='Info-details about-me form-group'>
                              <div className='d-flex gap-5'><h3>About Me</h3> <p> {aboutMe.length}/230</p></div>
                              <textarea
                                 placeholder='Tell other users a little bit about yourself.'
                                 rows={3}
                                 value={aboutMe}
                                 maxLength={230}
                                 onBlur={saveUserInfoChanges}
                                 onChange={(e) => { setAboutMe(e.target.value) }}
                              />
                           </div>

                           <div className='Info-details about-me form-group'>
                              <div className='d-flex gap-5'><h3>Looking For</h3> <p> {lookingFor.length}/230</p></div>
                              <textarea
                                 placeholder='Tell other users what you are looking for.'
                                 value={lookingFor}
                                 rows={3}
                                 maxLength={230}
                                 onBlur={saveUserInfoChanges}
                                 onChange={(e) => { setLookingFor(e.target.value) }} />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='row mb-10 gy-10'>
                     <div className='col-lg-6 col-md-12 col-12'>
                        <div className='Info-details'>
                           <h3>Public Photos</h3>
                        </div>

                        <div className='Photo-gallary custom-scroll'>
                           <ul className='multi-imgs'>
                              {
                                 !publicLoading ?
                                    publicImages?.map((image, index) => {
                                       return (
                                          <li key={`public-image@${Utils.GenerateRandomID()}`} onClick={() => toggleLightbox(!toggler, index)}>
                                             <img src={image.info.photoURL} alt="" />
                                             {/* <div className='overlay'>
                                             <i className="bi bi-eye-fill"></i>
                                          </div> */}

                                             <div className='addRemove-profileBtn'>
                                                <IconButton color="error" className='remove-btn'
                                                   onClick={() => { removeProfilePhoto(image.info.id, image.info.reference, "public") }}>
                                                   <i className="material-icons">close</i>
                                                </IconButton>
                                             </div>
                                          </li>
                                       )
                                    })
                                    :
                                    <div className="spinnerLoder"><CircularProgress /></div>
                              }
                           </ul>

                           <div className='view-more-btn'>
                              <label htmlFor='uploadPhoto'>
                                 <Input type="file" accept="image/*" multiple id="uploadPhoto" onChange={uploadPublicPhotos} />
                                 <Button variant="contained" component="span" className="red-btn">Upload</Button>
                              </label>
                           </div>
                        </div>
                     </div>

                     <div className='col-lg-6 col-md-12 col-12'>

                        <div className='Info-details'>
                           <h3>Private Photos</h3>
                        </div>

                        <div className='Photo-gallary custom-scroll'>
                           <ul className='multi-imgs'>
                              {
                                 !privateLoading ?
                                    privateImages?.map((image, index) => {
                                       return (
                                          <li key={`private-image@${Utils.GenerateRandomID()}`} onClick={() => toggleLightboxprivate(!togglerprivate, index)}>
                                             <img src={image.info.photoURL} alt="" />
                                             {/* <div className='overlay'>
                                             <i className="bi bi-eye-fill"></i>
                                          </div> */}

                                             <div className='addRemove-profileBtn'>
                                                <IconButton color="error" className='remove-btn'
                                                   onClick={() => { removeProfilePhoto(image.info.id, image.info.reference, "private") }}>
                                                   <i className="material-icons">close</i>
                                                </IconButton>
                                             </div>
                                          </li>
                                       )
                                    })
                                    :
                                    <div className="spinnerLoder"><CircularProgress /></div>
                              }
                           </ul>

                           <div className='view-more-btn'>
                              <label htmlFor='uploadPhoto2'>
                                 <Input type="file" accept="image/*" multiple id="uploadPhoto2" onChange={uploadPrivatePhotos} />
                                 <Button variant="contained" component="span" className="red-btn">Upload</Button>
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='row mb-10'>
                     <div className='col-lg-12'>
                        <div className='user-description'>
                           <div className='Info-details'>
                              <h3>More Information About <span>{userModel?.displayName}</span></h3>
                           </div>

                           <ul className='check-list profileInputs'>
                              <li className='form-group-2'>Height: <input onBlur={saveUserInfoChanges} maxLength={4} type="text" value={height ? height : ""} onChange={(e) => { setHeight(parseFloat(e.target.value)) }} /> <strong>cm</strong></li>
                              <li className='form-group-2'>Weight: <input onBlur={saveUserInfoChanges} maxLength={4} type="text" value={weight ? weight : ""} onChange={(e) => { setWeight(parseFloat(e.target.value)) }} /> <strong>lb</strong></li>
                              <li className='form-group-2'>
                                 Marital Status:
                                 <select value={maritalStatus} onBlur={saveUserInfoChanges} onChange={(e) => setMaritalStatus(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Divorced">Divorced</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Body Type:
                                 <select value={bodyType} onBlur={saveUserInfoChanges} onChange={(e) => setBodyType(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="Slim">Slim</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Athletic">Athletic</option>
                                    <option value="Heavy">Heavy</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Ethnicity:
                                 <select value={ethnicity} onBlur={saveUserInfoChanges} onChange={(e) => setEthnicity(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="White">White</option>
                                    <option value="Asian">Asian</option>
                                    <option value="Latino">Latino</option>
                                    <option value="Black">Black</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Hair Color:
                                 <select value={hairColor} onBlur={saveUserInfoChanges} onChange={(e) => setHairColor(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="Black">Black</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="Red">Red</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Other">Other</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Eye Color:
                                 <select value={eyeColor} onBlur={saveUserInfoChanges} onChange={(e) => setEyeColor(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Hazel">Hazel</option>
                                    <option value="Amber">Amber</option>
                                    <option value="Green">Green</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Other">Other</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Sexual Orientation:
                                 <select value={sexualOrientation} onBlur={saveUserInfoChanges} onChange={(e) => setSexualOrientation(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="Straight">Straight</option>
                                    <option value="Gay">Gay</option>
                                    <option value="Lesbian">Lesbian</option>
                                    <option value="Bisexual">Bisexual</option>
                                    <option value="Pansexual">Pansexual</option>
                                    <option value="Questioning">Questioning</option>
                                 </select>
                              </li>
                              <li className='form-group-2'>
                                 Language:
                                 <select value={language} onBlur={saveUserInfoChanges} onChange={(e) => setLanguage(e.target.value)} aria-label="Select example">
                                    <option disabled value="">Select</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Dutch">Dutch</option>
                                    <option value="Danish">Danish</option>
                                    <option value="Finnish">Finnish</option>
                                    <option value="Norwegian">Norwegian</option>
                                    <option value="Swedish">Swedish</option>
                                    <option value="Other">Other</option>
                                 </select>
                              </li>

                           </ul>

                        </div>
                     </div>
                     {/* <div className='col-lg-12 text-left py-10'>
                        <Button variant="contained" className="green-btn" onClick={saveUserInfoChanges}>Save Changes</Button>
                     </div> */}
                  </div>


               </div>

               {/* {isTablet &&
                  <BottomFooter />
               } */}

               <Footer />

            </div>
         </div>
         <div className="modal fade" id="Profile_Alert" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Profile Alert</h5>
                     <IconButton color="error" className='Closepop' data-bs-dismiss="modal" aria-label="Close">
                        <i className="material-icons">close</i>
                     </IconButton>
                  </div>

                  <div className="modal-body">
                     <p>Do you want to remove the profile image?</p>
                  </div>

                  <div className="modal-footer">
                     <Button variant="contained" className="red-btn" data-bs-dismiss="modal">No</Button>
                     <Button variant="contained" className="green-btn" data-bs-dismiss="modal" onClick={removeProfileImage}>Yes</Button>
                  </div>
               </div>
            </div>
         </div>

         <Snackbar 
        open={snackOpen}
        anchorOrigin={{ 'vertical':'top', 'horizontal':'right' }}
        onClose={handleClose}
        message={popupMessage} />

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

         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={Boolean(imgSrc)}
            onClose={handleCloseCropper}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={Boolean(imgSrc)}>
               <Box sx={style} className="profileView-popup">
                  {/* {imageUrl && <img alt="cri" src={imageUrl}/>} */}

                  <Box className="profileView-container">
                     <Box className="profileCrop-container">
                        <ReactCrop
                           // minHeight={300}
                           // minWidth={300}
                           // maxWidth={302}
                           // maxHeight={302}
                           aspect={1}
                           crop={crop}
                           onChange={(_, percentCrop) => setCrop(percentCrop)}
                           onComplete={(c) => { setCompletedCrop(c); getImageFromCrop(c) }}
                        >
                           <img
                              alt="Crop me"
                              src={imgSrc}
                              onLoad={onImageLoad}
                           />
                        </ReactCrop>
                     </Box>

                     {/* <Box className="profilePreview-container">
                        <canvas
                           ref={previewCanvasRef}
                           style={{
                              objectFit: 'contain',
                              width: completedCrop?.width || 0,
                              height: completedCrop?.height || 0,
                           }}
                        />
                     </Box> */}
                  </Box>
                  <Box className="uploadBtn">
                     <Button variant="contained" className="green-btn" onClick={uploadProfileImage}>Upload Profile Image</Button>
                  </Box>
               </Box>
            </Fade>
         </Modal>

      </>
   )
}

export default UserProfile