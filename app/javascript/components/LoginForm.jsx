import React from 'react';
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./Inputs/PasswordInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import SubmitInput from "./Inputs/SubmitInput";
import {authentication, authenticationLinks} from '../stylesheets/authentication_form.module.css'

const LoginForm = ({form_authenticity_token}) => {
  return (
    <div className={authentication}>
      <h1>Log in</h1>
      <form action="/user/sign_in" id="new_user" method="post">
        <AuthenticityTokenInput token={form_authenticity_token}/>
        <EmailInput name="user[email]"/>
        <PasswordInput placeholder="Password" name="user[password]"/>
        <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"/>
        <label htmlFor="user_remember_me">Remember me</label>
        <SubmitInput value="Log in"/>
      </form>
      <div className={authenticationLinks}>
        <GoogleLoginButton form_authenticity_token={form_authenticity_token}/>
        <a href="/user/password/new">Forgot your password?</a>
      </div>
    </div>
  );
};

export default LoginForm;
