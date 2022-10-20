import React from 'react';
import {submit} from '../../stylesheets/authentication_form.module.css'

const SubmitInput = ({value, ...props}) => {
  return (
    <input
      className={submit}
      type="submit"
      name="commit"
      value={value}
      {...props}
    />
  );
};

export default SubmitInput;
