import React from 'react';
import {authenticationPasswordInput} from '../../stylesheets/authentication_form.module.css'

const PasswordInput = ({...props}) => {
  return (
    <input
      className={authenticationPasswordInput}
      type="password"
      {...props}
    />
  );
};

export default PasswordInput;
