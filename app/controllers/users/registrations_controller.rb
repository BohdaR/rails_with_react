# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  layout "authentication", only: [:new]
end
