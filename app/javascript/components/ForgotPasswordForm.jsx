import React, {useState} from 'react';
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import {authentication, authenticationHeadline, formContainer} from '../stylesheets/authentication_form.module.css'
import SubmitInput from "./Inputs/SubmitInput";
import {Alert} from "@mui/material";
import {post} from "./useAPI/useAPI";

const ForgotPasswordForm = ({form_authenticity_token}) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const config = {
    headers: {
      accept: 'application/json'
    }
  }

  const handeSubmit = (e) => {
    e.preventDefault();
    setErrors({})

    const data = {
      authenticity_token: form_authenticity_token,
      user: {
        email: email,
      }
    }

    post(`${process.env.API_HOST}/user/password`, data, config)
      .then(
        () => {
          setSuccess('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.')
        }
      )
      .catch(
        (errors) => {
          setErrors(errors.response.data.errors)
        }
      )
  }

  return (
    <div className={formContainer}>
      <div className={authentication}>
        <h1 className={authenticationHeadline}>Forgot your password?</h1>
        {success ?
          <Alert severity="success" onClose={() => {
            setSuccess('')
          }} style={{marginBottom: 10}}>
            {success} <br/>
          </Alert> : null
        }
        {errors.email ?
          <Alert severity="error" onClose={() => {
            setErrors({
              email: null,
            })
          }} style={{marginBottom: 10}}>
            Email {errors.email} <br/>
          </Alert> : null
        }
        <form action="/user/password" id="new_user" method="post" onSubmit={(e) => handeSubmit(e)}>
          <EmailInput
            name="user[email]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitInput value="Send me reset password instructions"/>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
