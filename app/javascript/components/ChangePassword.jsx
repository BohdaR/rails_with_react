import React from 'react';
import {authentication, authenticationHeadline, formContainer} from "../stylesheets/authentication_form.module.css";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import SubmitInput from "./Inputs/SubmitInput";
import PasswordInput from "./Inputs/PasswordInput";
import HiddenMethodInput from "./Inputs/HiddenMethodInput";

const ChangePassword = ({form_authenticity_token, reset_password_token}) => {
  return (
    <div className={formContainer}>
      <div className={authentication}>
        <h1 className={authenticationHeadline}>Change your password</h1>
        <form action="/user/password" method="post">
          <input autoComplete="off"
                 type="hidden"
                 value={reset_password_token}
                 name="user[reset_password_token]"
                 id="user_reset_password_token"
          />
          <AuthenticityTokenInput token={form_authenticity_token}/>
          <HiddenMethodInput method="put"/>
          <PasswordInput placeholder="Password" name="user[password]"/>
          <PasswordInput placeholder="Password confirmation"
                         name="user[password_confirmation]"
          />
          <SubmitInput value="Change my password"/>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
