import React, {useState} from 'react';
import SubmitInput from "./Inputs/SubmitInput";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import HiddenMethodInput from "./Inputs/HiddenMethodInput";
import {
  authentication,
  authenticationHeadline,
  cancelAccBtn,
  submitBtnContainer
} from '../stylesheets/authentication_form.module.css'
import {Alert} from "@mui/material";
import {put} from "./useAPI/useAPI";

const EditUserForm = ({form_authenticity_token}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [errors, setErrors] = useState({});

  const config = {
    headers: {
      accept: 'application/json'
    }
  }

  const handeEditForm = (e) => {
    e.preventDefault();

    const data = {
      authenticity_token: form_authenticity_token,
      user: {
        password_confirmation: passwordConfirmation,
        current_password: currentPassword,
        password: password,
        email: email,
      }
    }

    put(`${process.env.API_HOST}/user`, data, config)
      .then(
        () => {
          setErrors({})
        }
      )
      .catch(
        (errors) => {
          setErrors(errors.response.data.errors)
        }
      )
  }

  return (
    <div className={authentication}>
      <h1 className={authenticationHeadline}>Edit profile</h1>
      {errors.email ?
        <Alert severity="error" onClose={() => {
          setErrors({
            email: null,
            password: errors.password,
            password_confirmation: errors.password_confirmation,
            current_password: errors.current_password
          })
        }} style={{marginBottom: 10}}>
          Email {errors.email} <br/>
        </Alert> : null
      }
      {errors.password ?
        <Alert severity="error" onClose={() => {
          setErrors({
            email: errors.email,
            password: null,
            password_confirmation: errors.password_confirmation,
            current_password: errors.current_password
          })
        }} style={{marginBottom: 10}}>
          Password {errors.password}
        </Alert> : null
      }
      {errors.password_confirmation ?
        <Alert severity="error" onClose={() => {
          setErrors({
            email: errors.email,
            password: errors.password,
            password_confirmation: null,
            current_password: errors.current_password
          })
        }} style={{marginBottom: 10}}>
          Password confirmation {errors.password_confirmation}
        </Alert> : null
      }
      {errors.current_password ?
        <Alert severity="error" onClose={() => {
          setErrors({
            email: errors.email,
            password: errors.password,
            password_confirmation: errors.password_confirmation,
            current_password: null
          })
        }} style={{marginBottom: 10}}>
          Password confirmation {errors.current_password}
        </Alert> : null
      }
      <form id="edit_user" action="/user" method="post" onSubmit={(e) => handeEditForm(e)}>
        <EmailInput
          name="user[email]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i>Leave blank if you don't want to change it</i>
        <PasswordInput
          placeholder="Password"
          value={password}
          name="user[password]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          placeholder="Password confirmation"
          value={passwordConfirmation}
          name="user[password_confirmation]"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <i>We need your current password to confirm your changes</i>
        <PasswordInput
          placeholder="Current password"
          name="user[current_password]"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div className={submitBtnContainer}>
          <SubmitInput value="Update"/>
        </div>
      </form>
      <form className="button_to" style={{position: "relative"}} method="post" action="/user">
        <HiddenMethodInput method="delete"/>
        <button className={cancelAccBtn} data-confirm="Are you sure?" type="submit">Delete Account</button>
        <AuthenticityTokenInput token={form_authenticity_token}/>
      </form>
    </div>
  );
};

export default EditUserForm;
