import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import Background from '../../../../assets/images/adult-artistic.webp'
import { User } from '../../../../client/client/user/User'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        User.SendPasswordResetEmail(values.email).then(() => {
          setHasErrors(false)
          setLoading(false)
        }).catch(() => {
          setHasErrors(true)
          setLoading(false)
          setSubmitting(false)
          setStatus('The login detail is incorrect')
        });
        // requestPassword(values.email)
        //   .then(({ data: { result } }) => {
        //     setHasErrors(false)
        //     setLoading(false)
        //   })
        //   .catch(() => {
        //     setHasErrors(true)
        //     setLoading(false)
        //     setSubmitting(false)
        //     setStatus('The login detail is incorrect')
        //   })
      }, 1000)
    },
  })

  return (
    <>
      <div className="Login-container" style={{
        background: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'top'
      }}>
        <form
          className='form fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={formik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-white mb-3 fs-xl-2x'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-white fw-bold fs-4'>Enter your email to reset your password.</div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-lg-15 alert alert-success'>
              <div className='alert-text font-weight-bold'>
                Sent password reset. Please check your email
              </div>
            </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-white fs-6'>Email</label>
            <input
              type='email'
              placeholder=''
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <button
              type='submit'
              id='kt_password_reset_submit'
              className='btn btn-lg btn-primary fw-bolder me-4'
            >
              <span className='indicator-label'>Submit</span>
              {loading && (
                <span className='indicator-progress'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <Link to='/auth/login'>
              <button
                type='button'
                id='kt_login_password_reset_form_cancel_button'
                className='btn btn-lg btn-light-primary fw-bolder'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Cancel
              </button>
            </Link>{' '}
          </div>
          {/* end::Form group */}
        </form>
      </div>
    </>
  )
}
