import React from 'react';
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./Inputs/PasswordInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import SubmitInput from "./Inputs/SubmitInput";
import {authentication,
  formContainer,
  authenticationLinks,
  checkboxLabel,
  checkbox,
  authenticationHeadline,
  formSeperator,
  forgotPasswordLink,
  signupWrapper
} from '../stylesheets/authentication_form.module.css'

const LoginForm = ({form_authenticity_token}) => {
  return (
    <div className={formContainer}>
      <div className={authentication}>
        <h1 className={authenticationHeadline}>Log in</h1>
        <form action="/user/sign_in" id="new_user" method="post">
          <AuthenticityTokenInput token={form_authenticity_token}/>
          <EmailInput name="user[email]"/>
          <PasswordInput placeholder="Password" name="user[password]"/>
          <input className={checkbox} type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"/>
          <label className={checkboxLabel} htmlFor="user_remember_me">Remember me</label>
          <SubmitInput value="Log in"/>
        </form>
        <div className={formSeperator}>OR</div>
        <div className={authenticationLinks}>
            <GoogleLoginButton form_authenticity_token={form_authenticity_token}/>
          <a href="/user/password/new" className={forgotPasswordLink}>Forgot your password?</a>
        </div>
        <div className={signupWrapper}>
          Don't have an account?
          <a class="signin-links signin-links-text" href="/user/sign_up">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
