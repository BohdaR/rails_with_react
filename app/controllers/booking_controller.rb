class BookingController < ApplicationController
  def greeting
    @users = User.all
  end
end
