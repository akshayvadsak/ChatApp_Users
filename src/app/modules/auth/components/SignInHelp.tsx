/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import Background from '../../../../assets/images/adult-artistic.webp'
import { AccountManagement, AccountManagementMode } from '../../../../client/client/system/AccountManagement'
import { Analytics, AnalyticsId } from '../../../../client/client/system/Analytics'
import {toAbsoluteUrl} from './../../../../_metronic/helpers'

type Props = {
  className: string
}

const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(50, 'Maximum 50 symbols')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

const initialValues = {
  password: '',
  confirmPassword: '',
}

const today = new Date();
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
const SignInHelp: React.FC<Props> = ({ className }) => {
  const history = useHistory();

  const search = useLocation().search;
  const mode: string = new URLSearchParams(search).get("mode") as string;
  const oobCode: string = new URLSearchParams(search).get("oobCode") as string;

  const [showPostOpLabel, setShowPostOpLabel] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [postOpMessage, setPostOpMessage] = useState<string>("");

  const [loading, setLoading] = useState(false)

  const [header, setHeader] = useState<string>();
  const [showButton, setShowButton] = useState<boolean>(false)
  const [buttonLabel, setButtonLabel] = useState<string>();
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false)

  const showPostOperationLabel = (isError: boolean, message: string) => {
    setIsError(isError);
    setPostOpMessage(message);
    setShowButton(false);
    setShowPostOpLabel(true);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: newPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      AccountManagement.ConfirmPasswordReset(oobCode, values.password).then(() => {
        //history.push("/auth/login");
        setLoading(false);
        setShowResetPassword(false);
        showPostOperationLabel(false, "Successfully Reset Password! You may now use your new password to login.");
      }).catch(() => {
        setLoading(false);
        setShowResetPassword(false);
        showPostOperationLabel(true, "Expired / Invalid Password Reset Code");
      })
      // User.SignIn(loginByEmail, () => {
      //   setLoading(false)
      //   setHasErrors(false);
      //   dispatch(chat.actions.setAuthorised(true))
      // }, () => {
      //   setLoading(false)
      //   setSubmitting(false)
      //   setStatus('The login detail is incorrect')
      //   setHasErrors(true);
      // }, values.password, values.password);
    },
  })

  useEffect(() => {
    if (!mode || !oobCode) 
    {
      setHeader("Invalid Access");
      showPostOperationLabel(true, "You do not have access to view this page");
    }

    switch (mode)
    {
      case AccountManagementMode.RESET_PASSWORD:
        AccountManagement.VerifyPasswordResetCode(oobCode).then(() => {
          setHeader("Reset Password")
          setShowResetPassword(true);
          setShowButton(true);
          setButtonLabel("SUBMIT");
        }).catch(() => {
          showPostOperationLabel(true, "Expired / Invalid Password Reset Code");
        });
        break;
      case AccountManagementMode.VERIFY_EMAIL:
        AccountManagement.VerifyEmailAddress(oobCode).then(() => {
          showPostOperationLabel(false, "Successfully Verified Email!")
          history.push("/auth/login");
        }).catch(() => {
          showPostOperationLabel(true, "Expired / Invalid Email Veriication Code");
        });
    }
  }, [mode, oobCode, history]);

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
            <h1 className='text-white mb-3 fs-xl-1x'>{header}</h1>
          </div>
          {/* begin::Heading */}

          {showPostOpLabel === true && (
            <div className={`mb-lg-15 alert alert-${isError ? 'danger' : 'success'}`}>
              <div className='alert-text font-weight-bold'>
                {postOpMessage}
              </div>
            </div>
          )}

          {
            mode === AccountManagementMode.RESET_PASSWORD && showResetPassword?
              <>
                <div className='fv-row mb-8'>
                  <input
                    {...formik.getFieldProps('password')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      { 'is-invalid': formik.touched.password && formik.errors.password },
                      {
                        'is-valid': formik.touched.password && !formik.errors.password,
                      }
                    )}
                    type='password'
                    name='password'
                    autoComplete='off'
                    placeholder='New Password'
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                      <span role='alert'>{formik.errors.password}</span>
                    </div>
                  )}
                </div>
                
                <div className='fv-row mb-8'>

                  <input
                    type='password'
                    {...formik.getFieldProps('confirmPassword')}
                    autoComplete='off'
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
                      },
                      {
                        'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                      } 
                    )}
                    placeholder="Confirm New Password"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.confirmPassword}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            :
              <>
              <div className='text-center'><Link to={`/auth/login`}><button className='btn btn-lg btn-primary w-50 mb-5 h-55px'>Login</button></Link></div>
              </>
          }
          
          {/* begin::Action */}
          {
            showButton ?
                <div className='text-center'>
                  <button
                    type='submit'
                    // On Click
                    id='kt_sign_in_submit'
                    className='btn btn-lg btn-primary w-50 mb-5 h-55px'
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!loading && <span className='indicator-label'>{buttonLabel}</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              :
                <></>
          }
          
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
  </>
  )
}

export default SignInHelp