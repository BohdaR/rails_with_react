import React from 'react';
import SubmitInput from "./Inputs/SubmitInput";
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./Inputs/PasswordInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import {
  authentication,
  authenticationHeadline,
  authenticationLinks,
  formContainer, formSeparator, signupWrapper
} from '../stylesheets/authentication_form.module.css'

const RegForm = ({form_authenticity_token}) => {
  return (
    <div className={formContainer}>
      <div className={authentication}>
        <h1 className={authenticationHeadline}>Sing up</h1>
        <form action="/user" id="new_user" method="post">
          <AuthenticityTokenInput token={form_authenticity_token}/>
          <EmailInput name="user[email]"/>
          <PasswordInput placeholder="Password" name="user[password]"/>
          <PasswordInput placeholder="Password confirmation" name="user[password_confirmation]"/>
          <SubmitInput value="Sign up"/>
        </form>
        <div className={formSeparator}>OR</div>
        <div className={authenticationLinks}>
          <GoogleLoginButton form_authenticity_token={form_authenticity_token}/>
        </div>
        <div className={signupWrapper}>
          Already have an account?
          <a className="signin-links signin-links-text" href="/user/sign_in">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
