import React from 'react';
import AuthenticityTokenInput from "./Inputs/AuthenticityTokenInput";
import SubmitInput from "./Inputs/SubmitInput";

const GoogleLoginButton = ({form_authenticity_token}) => {
  return (
    <form action="/user/auth/google_oauth2" method="post">
      <AuthenticityTokenInput token={form_authenticity_token}/>
      <SubmitInput value="Login with Google"/>
    </form>
  );
};

export default GoogleLoginButton;
