import React from 'react';
import SubmitInput from "./Inputs/SubmitInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import HiddenMethodInput from "./Inputs/HiddenMethodInput";
import {authentication, authenticationHeadline} from '../stylesheets/authentication_form.module.css'

const EditUserForm = ({form_authenticity_token}) => {
  return (
    <div className={authentication}>
      <h1 className={authenticationHeadline}>Edit profile</h1>
      <form id="edit_user" action="/user" method="post">
        <HiddenMethodInput method="put"/>
        <AuthenticityTokenInput token={form_authenticity_token}/>
        <EmailInput name="user[email]"/>
        <i>Leave blank if you don't want to change it</i>
        <PasswordInput placeholder="Password" name="user[password]"/>
        <PasswordInput placeholder="Password confirmation" name="user[password_confirmation]"/>
        <i>We need your current password to confirm your changes</i>
        <PasswordInput placeholder="Current password" name="user[current_password]"/>
        <SubmitInput value="Update"/>
      </form>
      <form className="button_to" method="post" action="/user">
        <HiddenMethodInput method="delete"/>
        <button data-confirm="Are you sure?" type="submit">Cancel my account</button>
        <AuthenticityTokenInput token={form_authenticity_token}/>
      </form>
    </div>
  );
};

export default EditUserForm;
