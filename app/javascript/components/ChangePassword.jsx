import React, {useState} from 'react';
import {authentication, authenticationHeadline, formContainer} from "../stylesheets/authentication_form.module.css";
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import SubmitInput from "./Inputs/SubmitInput";
import PasswordInput from "./Inputs/PasswordInput";
import HiddenMethodInput from "./Inputs/HiddenMethodInput";
import {put} from "./useAPI/useAPI";
import {Alert} from "@mui/material";

const ChangePassword = ({form_authenticity_token, reset_password_token}) => {

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
        password: password,
        password_confirmation: passwordConfirmation,
        reset_password_token: reset_password_token
      }
    }

    put(`${process.env.REACT_API_HOST}/user/password`, data, config)
      .then(
        () => {
          document.location.replace('/')
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
        <h1 className={authenticationHeadline}>Change your password</h1>
        {errors.password ?
          <Alert severity="error" onClose={() => {
            setErrors({password: null, password_confirmation: errors.password_confirmation})
          }} style={{marginBottom: 10}}>
            Password {errors.password}
          </Alert> : null
        }
        {errors.password_confirmation ?
          <Alert severity="error" onClose={() => {
            setErrors({password: errors.password, password_confirmation: null})
          }} style={{marginBottom: 10}}>
            Password confirmation {errors.password_confirmation}
          </Alert> : null
        }
        <form action="/user/password" method="post" onSubmit={(e) => handeSubmit(e)}>
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
          <SubmitInput value="Change my password"/>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
