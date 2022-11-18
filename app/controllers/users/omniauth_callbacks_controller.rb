# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    user = User.from_google(auth)

    if user.present?
      user.access_token = auth.credentials.token
      user.expires_at = auth.credentials.expires_at
      user.refresh_token = auth.credentials.refresh_token
      user.save!
      sign_out_all_scopes
      sign_in_and_redirect user, event: :authentication
    else
      redirect_to new_user_session_path
    end
  end

  def from_google_params
    @from_google_params ||= {
      uid: auth.uid,
      email: auth.info.email
    }
  end

  def auth
    @auth ||= request.env["omniauth.auth"]
  end
end
