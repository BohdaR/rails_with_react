import React from 'react';

const AuthenticityTokenInput = ({token}) => {
  return (
    <input type="hidden" name="authenticity_token" value={token} autoComplete="off"/>
  );
};

export default AuthenticityTokenInput;
