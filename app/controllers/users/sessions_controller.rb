# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  layout "authentication", only: [:new]
end
