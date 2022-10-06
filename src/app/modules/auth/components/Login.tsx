/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { KTSVG } from '../../../../_metronic/helpers'
import { User } from './../../../../client/client/user/User'
//import Background from '../../../../../../media/patterns/pattern-1.jpg'
import Background from '../../../../assets/images/adult-artistic.webp'
import * as chat from './../../apps/chat/ChatRedux'
import { useDispatch } from 'react-redux'
import { HttpsActionNames, HttpsHandler } from '../../../../client/client/system/HttpsHandler'
import { Chat } from '../../../../client/client/chat/Chat'
import { Utils } from '../../../../client/client/system/Utils'
import { Analytics, AnalyticsId } from '../../../../client/client/system/Analytics'
import {toAbsoluteUrl} from './../../../../_metronic/helpers'

const loginSchema = Yup.object().shape({
  user: Yup.string()
    .required('Username / Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-z A-Z!_]+$/, 'Username must not use special characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  gender: Yup.string()
    .required('Gender is required'),
  birthday: Yup.string()
    .required('Birthday is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  terms: Yup.boolean()
    .required('Must accept Terms and Conditions'),
  day: Yup.string().required('Day of birth is required'),
  month: Yup.string().required('Month of birth is required'),
  year: Yup.string().required('Year of birth is required')
});

const initialValues = {
  user: '',
  password: '',
}

const today = new Date();

const initialSignUpValues = {
  username: '',
  password: '',
  gender: '',
  birthday: `${new Date().getFullYear() - 18}-01-01`,
  email: '',
  terms: false,
  year: `${new Date().getFullYear() - 18}`,
  month: '1',
  day: '1'
}


/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loginByEmail, setLoginByEmail] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [showPostOpLabel, setShowPostOpLabel] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [postOpMessage, setPostOpMessage] = useState<string>("");

  const hideRegisterModal = () => {
    setShowPostOpLabel(false);
    setShowResults(false);
  }

  const showPostOperationLabel = (isError: boolean, message: string) => {
    setIsError(isError);
    setPostOpMessage(message);
    setShowPostOpLabel(true);
  }

  const hidePostOperationLabel = () => {
    setShowPostOpLabel(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      let user;

      let payload: Map<string, any> = new Map<string, any>();
      let login_type;
      let login_value = values.user;

      if (values.user.includes("@"))
      {
        user = values.user;
        login_type = "email";
      } else
      {
        login_type = "username";
        let url = `${HttpsHandler.BASE_URL}/${HttpsActionNames.GET_USER_DATA_BY_NAME}?username=${values.user}`;
        await HttpsHandler.SendGetRequest(url, false, (success, data, message) => {
          console.log(`Success: ${success}`);
          if (success) 
          {
            
            let userModel = Utils.ParseDataToUserModel(data);
            let payload = new Map<string, any>();
            payload.set("is_auto_generated", 0);
            payload.set("user_id", userModel.uuid);
            Analytics.SendAnalyticsEvent(AnalyticsId.SIGN_UP, payload, true);
            // console.log(`User Data Name: ${userModel.displayName}`);
            user = userModel.email;
          }
        }, (success, message) => {
          console.log(`Failed: ${message}`);
        });
      }

      payload.set("login_value", login_value);
      payload.set("login_type", login_type);
      Analytics.SendAnalyticsEvent(AnalyticsId.LOGIN, payload);
      User.SignIn(loginByEmail, () => {
        setLoading(false)
        setHasErrors(false);
        dispatch(chat.actions.setAuthorised(true))
        // dispatch(chat.actions.setMessages([]));
        // dispatch(chat.actions.setUnread(0));
        // dispatch(chat.actions.setCreditLoader(true));
        // dispatch(chat.actions.setCredits(0));
        // dispatch(chat.actions.setLoader(true));
      }, () => {
        setLoading(false)
        setSubmitting(false)
        setStatus('The login detail is incorrect')
        setHasErrors(true);
      }, user, values.password);
    },
  })

  const signUpFormik = useFormik({
    initialValues: initialSignUpValues,
    validationSchema: signUpSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      let url = `${HttpsHandler.BASE_URL}/${HttpsActionNames.ON_USER_SIGN_UP}`
      let params = {
        username: values.username,
        email: values.email,
        password: values.password,
        gender: values.gender,
        birthday: `${values.year}-${values.month}-${values.day}`,
        site: Chat.SITE
      }

      setSignUpLoading(true);
      HttpsHandler.SendPostRequest(url, params, true, (success, data, message) => {
        if (success)
        {
          showPostOperationLabel(false, "Successfully Created a User Account! Please wait while we log you in.");
          User.SignIn(true, () => {
            $('#registermodal').modal('hide');
            setSignUpLoading(false);
            setHasErrors(false);
            dispatch(chat.actions.setAuthorised(true))
            // dispatch(chat.actions.setMessages([]));
            // dispatch(chat.actions.setUnread(0));
            // dispatch(chat.actions.setCreditLoader(true));
            // dispatch(chat.actions.setCredits(0));
            // dispatch(chat.actions.setLoader(true));
          }, () => {
            setSignUpLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
            setHasErrors(true);
          }, values.email, values.password);
        } else {
          setSubmitting(false);
          setSignUpLoading(false);
          showPostOperationLabel(true, message);
        }
      }, (success, message) => {
        setSignUpLoading(false);
        setSubmitting(false);
        showPostOperationLabel(true, message);
      });
    },
  });

  function SignIn(byEmail: boolean) {
    setLoginByEmail(byEmail);
  }

  const generateYearOptions = () => {
    const arr = [];
  
    const startYear = 1922;
    const endYear = new Date().getFullYear() - 18;
  
    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option key={`year@${Utils.GenerateRandomID()}`} value={i}>{i}</option>);
    }
  
    return arr;
  };

  const generateDateOptions = () => {
    const arr = [];
  
    const startYear = 1;
    const endYear = 31;
  
    for (let i = startYear; i <= endYear; i++) {
      arr.push(<option key={`date@${Utils.GenerateRandomID()}`} value={i}>{i}</option>);
    }
  
    return arr;
  };

  const generateMonthOptions = () => {
    const arr = [];
  
    const startYear = 1;
    const endYear = 12;
  
    for (let i = startYear; i <= endYear; i++) {
      arr.push(<option key={`month@${Utils.GenerateRandomID()}`} value={i}>{i}</option>);
    }
  
    return arr;
  };

  const [showResults, setShowResults] = React.useState(false)
  const goToNextRegisterPage = () => {
    setShowResults(true)
    hidePostOperationLabel();
  };
  const backToFirstRegisterPage = () => setShowResults(false);

  return (
    <>
    <div className="Login-container" style={{
      background: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'top'
    }}>
      <form
        className='form'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >

        <div className='LoginLogo mb-10'>
          <img src='/media/logos/flirtybum-white.png' alt="Pic" />
        </div>

        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-white mb-3 fs-xl-1x'>Sign In to FlirtyBum</h1>
        </div>
        {/* begin::Heading */}

        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Wrong email and/or password. Please try again.
            </div>
          </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
          {/* <label className='form-label fs-6 text-white'>Email</label> */}
          <input
            {...formik.getFieldProps('user')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.user && formik.errors.user },
              {
                'is-valid': formik.touched.user && !formik.errors.user,
              }
            )}
            type="text"
            name='user'
            autoComplete='off'
            placeholder='Email / Username'
            id='user'
          />
          {formik.touched.user && formik.errors.user && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.user}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>

          <input
            type='password'
            {...formik.getFieldProps('password')}
            autoComplete='off'
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
          <div className='d-flex justify-content-end mt-2'>
            <div className='d-flex flex-stack'>
              {/* begin::Label */}
              {/* <label className='form-label text-white fs-6 mb-0'>Password</label> */}
              {/* end::Label */}
              {/* begin::Link */}
              <Link
                to='/auth/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{ marginLeft: '5px' }}
              >
                Forgot Password ?
              </Link>
              {/* end::Link */}
            </div>
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            onClick={() => { SignIn(true) }}
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-50 mb-5 h-55px'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>SIGN IN</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

        <div className='RegisterLink'>
          <p>Not a member? <strong><Link to='#' data-bs-toggle="modal"
          data-bs-target="#registermodal" onClick={signUpFormik.handleReset}>Register</Link></strong> </p>
        </div>
        {/* end::Action */}
      </form>

    </div>

    <footer className="home_footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className='col-lg-12'>
            <div className='footer-content'>
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-sm-12 order01">
                  <div className="copyright">
                    <span> PWR Network Limited <br></br> Souniou 13 Agia Fyla 3116 Limassol Cyprus</span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 order02">
                  <div className="footer_menu">
                    <ul>
                      <li><Link to='/terms-conditions'>Terms &amp; conditions</Link></li>
                      <li><Link to='/privacy-policy'> Privacy statement</Link></li>
                      <li><Link to='/cookies'>Cookies</Link></li>
                      <li><Link to='/about-us'>About us</Link> </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 img_wrap">
                  <img alt='' className="h-40px" src={toAbsoluteUrl('/media/misc/cards-400x61-1.webp')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer_down">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <span><Link to='flirtybum.com'>flirtybum.com</Link> &copy; {today.getFullYear()} All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div className="modal fade" tabIndex={-1} id="registermodal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2 postionright"
            data-bs-dismiss="modal"
            onClick={() => {hideRegisterModal()}}
            aria-label="Close"
          >
          <KTSVG
            path="/media/icons/duotune/arrows/arr061.svg"
            className="svg-icon svg-icon-2x"
          />
        </div>
          <div className="modal-body">

            { showResults ? 
              (
                <div className="feature_box_img">
                  <img alt="chatter_icon" src="/media/ChaterIcons/pic_03cfaeba2ae0bb5d6732d827ff716ef8.jpg" />
                </div>
              ) : 
              (
                <div className="feature_box_img">
                  <img alt="chatter_icon" src="/media/ChaterIcons/pic_072c37e543755dace63b876ac3774bd6.jpg" />
                </div>
              )
            }
            
            <div className='main_cover_wrap'>
              <h1 className='TitlePopup'>Create a free profile in 30 seconds.</h1>

              <form
                className='form'
                onSubmit={signUpFormik.handleSubmit}
                noValidate
                id='kt_signup_form'
              >
                  {showResults ? (
                    <div className='popup_form_wrapper step2'>
                      <div className='InputForm'>

                        <div className="mb-10 inputdesign">
                          <label>Your date of birth</label>
                          <div className='row'>
                            

                            <div className='col-lg-4'>
                              <div className='withArrow'>
                                <select {...signUpFormik.getFieldProps('year')} className="form-select withArrow" aria-label="Select example">
                                  <option value='' selected>YYYY</option>
                                  {generateYearOptions()}
                                  </select>
                              </div>
                              {signUpFormik.touched.year && signUpFormik.errors.year && (
                            <div className='fv-plugins-message-container'>
                              <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.year}</span>
                            </div>
                          )}
                            </div>

                            <div className='col-lg-4'>
                              <div className='withArrow'>
                                <select {...signUpFormik.getFieldProps('month')} className="form-select withArrow" aria-label="Select example">
                                  <option value=''>MM</option>
                                  {generateMonthOptions()}
                                </select>
                              </div>
                              {signUpFormik.touched.month && signUpFormik.errors.month && (
                            <div className='fv-plugins-message-container'>
                              <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.month}</span>
                            </div>
                          )}
                            </div>

                            <div className='col-lg-4'>
                              <div className='withArrow'>
                                <select {...signUpFormik.getFieldProps('day')} className="form-select" aria-label="Select example">
                                  <option value='' selected>DD</option>
                                  {generateDateOptions()}
                                </select>
                              </div>
                              {signUpFormik.touched.day && signUpFormik.errors.day && (
                            <div className='fv-plugins-message-container'>
                              <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.day}</span>
                            </div>
                          )}
                            </div>

                          </div>
                        </div>

                        {/* <div className="mb-10 inputdesign">
                          <label>Your date of births</label>
                          <div className='row'>
                            <div className='col-lg-4'>
                              <input 
                                {...signUpFormik.getFieldProps('birthday')}
                                type="date"
                                className={clsx(
                                  'form-control form-control-lg form-control-solid',
                                  { 'is-invalid': signUpFormik.touched.birthday && signUpFormik.errors.birthday },
                                  {
                                    'is-valid': signUpFormik.touched.birthday && !signUpFormik.errors.birthday,
                                  }
                                )}
                              />
                              {signUpFormik.touched.birthday && signUpFormik.errors.birthday&& (
                                <div className='fv-plugins-message-container'>
                                  <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.birthday}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div> */}

                        <div className="mb-10 inputdesign">
                          <input
                            {...signUpFormik.getFieldProps('email')}
                            className={clsx(
                              'form-control form-control-lg form-control-solid',
                              { 'is-invalid': signUpFormik.touched.email && signUpFormik.errors.email },
                              {
                                'is-valid': signUpFormik.touched.email && !signUpFormik.errors.email,
                              }
                            )}
                            type="email"
                            placeholder="Your Email Address"
                            id="email"
                          />
                          {signUpFormik.touched.email && signUpFormik.errors.email && (
                            <div className='fv-plugins-message-container'>
                              <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.email}</span>
                            </div>
                          )}
                        </div>

                        <div className='termscontion'>
                          <div className="form-check form-check-custom form-check-solid">
                            <input
                              {...signUpFormik.getFieldProps("terms")}
                              className={clsx(
                                'form-check-input',
                                { 'is-invalid': signUpFormik.touched.terms && signUpFormik.errors.terms },
                                {
                                  'is-valid': signUpFormik.touched.terms && !signUpFormik.errors.terms,
                                }
                              )} 
                              type="checkbox" 
                              checked={signUpFormik.values.terms}
                              id="flexCheckChecked" />
                            By becoming a member, I agree to the <Link to={'#'}>Terms and Conditions</Link> and the use of fictional entertainers’ profiles, marked with a heart icon, with which physical contact is not possible.
                          </div>

                          <div className='mt-10'>
                            <label>By submitting my account information, I understand that PWR Network Limited will process my personal data in accordance with the <Link to={'#'}>Privacy Statement</Link>.</label>
                          </div>

                          {showPostOpLabel === true && (
                            <div className={`mb-lg-15 alert alert-${isError ? 'danger' : 'success'}`}>
                              <div className='alert-text font-weight-bold'>
                                {postOpMessage}
                              </div>
                            </div>
                          )}

                          <div className='text-center'>
                            
                            
                            <button 
                              type='submit'
                              className='btn btn-lg btn-success w-50 mt-5 h-55px' 
                              disabled={signUpFormik.isSubmitting || !signUpFormik.values.terms}
                            >
                              {!signUpLoading && <span className='indicator-label'>Chat Now</span>}
                              {signUpLoading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                  Please wait...
                                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                              )}
                            </button>
                            <div></div>

                            <button
                              type='button'
                              className='btn btn-lg btn-primary w-50 mt-5 h-55px'
                              disabled={signUpFormik.isSubmitting}
                              onClick={backToFirstRegisterPage}
                            >
                              <span className='indicator-label'>Back</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='popup_form_wrapper step1'>
                      <div className='InputForm'>
                        <div className="mb-10 inputdesign">
                          <input
                            {...signUpFormik.getFieldProps('username')}
                            type="text"
                            className={clsx(
                              'form-control form-control-lg form-control-solid',
                              { 'is-invalid': signUpFormik.touched.username && signUpFormik.errors.username },
                              {
                                'is-valid': signUpFormik.touched.username && !signUpFormik.errors.username,
                              }
                            )}
                            name='username'
                            placeholder="Enter a username"
                            id="username"
                          />
                            {signUpFormik.touched.username && signUpFormik.errors.username && (
                              <div className='fv-plugins-message-container'>
                                <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.username}</span>
                              </div>
                            )}
                          <label><strong>Tip:</strong> Doesn't have to be your own name.</label>
                        </div>

                        <div className="mb-10 inputdesign">
                          <input
                            {...signUpFormik.getFieldProps('password')}
                            type="password"
                            className={clsx(
                              'form-control form-control-lg form-control-solid',
                              { 'is-invalid': signUpFormik.touched.password && signUpFormik.errors.password },
                              {
                                'is-valid': signUpFormik.touched.password && !signUpFormik.errors.password,
                              }
                            )}
                            name='password'
                            placeholder="Enter a secure password"
                            id="password"
                          />
                            {signUpFormik.touched.password && signUpFormik.errors.password && (
                              <div className='fv-plugins-message-container-2'>
                                <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.password}</span>
                              </div>
                            )}
                        </div>

                        <div className="mb-10 inputdesign">
                          <select 
                            {...signUpFormik.getFieldProps('gender')}
                            id="gender" 
                            className={clsx(
                              'form-control form-control-lg form-control-solid',
                              { 'is-invalid': signUpFormik.touched.gender && signUpFormik.errors.gender },
                              {
                                'is-valid': signUpFormik.touched.gender && !signUpFormik.errors.gender,
                              }
                            )}
                          >
                            <option disabled value="">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                            {signUpFormik.touched.gender && signUpFormik.errors.gender && (
                              <div className='fv-plugins-message-container'>
                                <span role='alert' style={{ color: "black" }}>{signUpFormik.errors.gender}</span>
                              </div>
                            )}
                        </div>

                        <div className='text-center'>
                          <button 
                            type='button' 
                            className='btn btn-lg btn-primary w-50 mb-5 h-55px' 
                            onClick={goToNextRegisterPage} 
                            disabled={signUpFormik.errors.username || signUpFormik.errors.password || signUpFormik.errors.gender || 
                                      !signUpFormik.values.username || !signUpFormik.values.password || !signUpFormik.values.gender ? true : false}
                          >
                            <span className='indicator-label'>Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
</>
  )
}