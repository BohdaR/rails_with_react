import React from 'react';
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import {authentication, authenticationHeadline} from '../stylesheets/authentication_form.module.css'
import SubmitInput from "./Inputs/SubmitInput";

const ForgotPasswordForm = ({form_authenticity_token}) => {
  return (
    <div className={authentication}>
      <h1 className={authenticationHeadline}>Forgot your password?</h1>
      <form action="/user/sign_in" id="new_user" method="post">
        <AuthenticityTokenInput token={form_authenticity_token}/>
        <EmailInput name="user[email]"/>
        <SubmitInput value="Send me reset password instructions"/>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
