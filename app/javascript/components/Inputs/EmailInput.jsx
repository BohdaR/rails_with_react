import React from 'react';

const EmailInput = ({...props}) => {
  return (
    <input autoFocus="autofocus" placeholder="Email" type="email" {...props} />
  );
};

export default EmailInput;
