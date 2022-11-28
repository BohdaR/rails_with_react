# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_action :authenticate_user!
  rescue_from CanCan::AccessDenied do |exception|
    if current_user
      render file: "#{Rails.root}/public/403.html", status: 403, layout: false
    else
      render file: "#{Rails.root}/public/401.html", status: 401, layout: false
    end
  end
end
