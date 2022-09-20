import React from 'react';
import SubmitInput from "./SubmitInput";
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInput from "./PasswordInput";
import AuthenticityTokenInput from "./AuthenticityTokenInput";
import EmailInput from "./EmailInput";

const RegForm = ({form_authenticity_token}) => {
    return (
        <div className="authentication">
            <h1>Sing up</h1>
            <form action="/user" id="new_user" method="post">
                <AuthenticityTokenInput token={form_authenticity_token} />
                <EmailInput name="user[email]" />
                <PasswordInput placeholder="Password" name="user[password]" />
                <PasswordInput placeholder="Password confirmation" name="user[password_confirmation]" />
                <SubmitInput value="Sign up" />
            </form>
            <div className="authentication-links">
                <GoogleLoginButton form_authenticity_token={form_authenticity_token}/>
            </div>
        </div>
    );
};

export default RegForm;