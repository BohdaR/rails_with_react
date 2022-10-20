import React from 'react';
import {authenticationEmailInput} from '../../stylesheets/authentication_form.module.css'

const EmailInput = ({...props}) => {
  return (
    <input
      className={authenticationEmailInput}
      autoFocus="autofocus"
      placeholder="Email"
      type="email"
      {...props}
    />
  );
};

export default EmailInput;
