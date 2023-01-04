# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  layout "authentication", only: [:new]
  before_action :configure_devise_permitted_parameters

  def configure_devise_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name])
  end
end
