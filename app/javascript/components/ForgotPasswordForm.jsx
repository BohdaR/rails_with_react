import React from 'react';
import AuthenticityTokenInput from "./AuthenticityTokenInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import SubmitInput from "./SubmitInput";

const ForgotPasswordForm = ({form_authenticity_token}) => {
    return (
        <div className="authentication">
            <h1>Forgot your password?</h1>
            <form action="/user/sign_in" id="new_user" method="post">
                <AuthenticityTokenInput token={form_authenticity_token} />
                <EmailInput name="user[email]"/>
                <SubmitInput value="Send me reset password instructions" />
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
