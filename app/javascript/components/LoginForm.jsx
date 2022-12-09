import React, {Fragment, useState} from 'react';
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./Inputs/PasswordInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import SubmitInput from "./Inputs/SubmitInput";
import {
  authentication,
  formContainer,
  authenticationLinks,
  checkboxLabel,
  checkbox,
  authenticationHeadline,
  formSeparator,
  forgotPasswordLink,
  signupWrapper
} from '../stylesheets/authentication_form.module.css'
import {get, post} from "./useAPI/useAPI";
import {Alert} from "@mui/material";

const LoginForm = ({form_authenticity_token}) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      authenticity_token: form_authenticity_token,
      user: {
        password: password,
        email: email,
        remember_me: rememberMe
      }
    }

    const config = {
      headers: {
        accept: 'application/json'
      }
    }

    post(`${process.env.HOST}/user/sign_in`, data, config).then(
      (responce) => {
        document.location.replace('/')
      }
    ).catch(
      (errors) => {
        setErrors(errors.response.data.error)
      }
    )
  }

  return (
      <div className={formContainer}>
        <div className={authentication}>
          <h1 className={authenticationHeadline}>Log in</h1>
          {errors ?
          <Alert severity="error" onClose={() => {setErrors(null)}} style={{marginBottom: 10}}>
            {errors}
          </Alert> : null
          }
          <form action="/user/sign_in" id="new_user" method="post" onSubmit={(e) => handleSubmit(e)}>
            <AuthenticityTokenInput token={form_authenticity_token}/>
            <EmailInput name="user[email]" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <PasswordInput
              placeholder="Password"
              value={password}
              name="user[password]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={checkbox}
              type="checkbox"
              value={rememberMe}
              name="user[remember_me]"
              id="user_remember_me"
              onChange={(e) => setRememberMe(e.target.value)}
            />
            <label className={checkboxLabel} htmlFor="user_remember_me">Remember me</label>
            <SubmitInput value="Log in"/>
          </form>
          <div className={formSeparator}>OR</div>
          <div className={authenticationLinks}>
            <GoogleLoginButton form_authenticity_token={form_authenticity_token}/>
            <a href="/user/password/new" className={forgotPasswordLink}>Forgot your password?</a>
          </div>
          <div className={signupWrapper}>
            Don't have an account?
            <a className="signin-links signin-links-text" href="/user/sign_up">Sign Up</a>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;
