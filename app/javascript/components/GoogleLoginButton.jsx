import React from 'react';
import AuthenticityTokenInput from "./AuthenticityTokenInput";
import SubmitInput from "./SubmitInput";

const GoogleLoginButton = ({form_authenticity_token}) => {
    return (
        <form action="/user/auth/google_oauth2" method="post">
            <AuthenticityTokenInput token={form_authenticity_token}/>
            <SubmitInput value="Login with Google"/>
        </form>
    );
};

export default GoogleLoginButton;
