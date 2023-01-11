import React, {useState} from 'react';
import SubmitInput from "./Inputs/SubmitInput";
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./Inputs/PasswordInput";
import EmailInput from "./Inputs/EmailInput";
import {
  authentication,
  authenticationHeadline,
  authenticationLinks,
  formContainer,
  formSeparator,
  signupWrapper,
  authenticationFullNameInput
} from '../stylesheets/authentication_form.module.css'
import {post} from "./useAPI/useAPI";
import {Alert} from "@mui/material";

const RegForm = ({form_authenticity_token}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      authenticity_token: form_authenticity_token,
      user: {
        password: password,
        password_confirmation: passwordConfirmation,
        email: email,
        full_name: fullName,
      }
    }

    const config = {
      headers: {
        accept: 'application/json'
      }
    }

    post(`${process.env.API_HOST}/user`, data, config).then(
      (responce) => {
        document.location.replace('/')
      }
    ).catch(
      (errors) => {
        setErrors(errors.response.data.errors)
      }
    )
  }
  return (
    <div className={formContainer}>
      <div className={authentication}>
        <h1 className={authenticationHeadline}>Sing up</h1>
        {errors.email ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, email: null})
          }} style={{marginBottom: 10}}>
            Email {errors.email} <br/>
          </Alert> : null
        }
        {errors.password ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors,  password: null,})
          }} style={{marginBottom: 10}}>
            Password {errors.password}
          </Alert> : null
        }
        {errors.password_confirmation ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, password_confirmation: null})
          }} style={{marginBottom: 10}}>
            Password confirmation {errors.password_confirmation}
          </Alert> : null
        }
        {errors.full_name ?
          <Alert severity="error" onClose={() => {
            setErrors({...errors, full_name: null})
          }} style={{marginBottom: 10}}>
            Full name {errors.full_name}
          </Alert> : null
        }
        <form action="/user" id="new_user" method="post" onSubmit={(e) => handleSubmit(e)}>
          <EmailInput name="user[email]" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input
            className={authenticationFullNameInput}
            placeholder="Full name"
            value={fullName}
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <SubmitInput value="Sing up"/>
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
