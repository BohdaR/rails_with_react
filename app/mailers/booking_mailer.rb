# frozen_string_literal: true

class BookingMailer < ApplicationMailer
  def booked_place_email
    @employee = params[:employee]
    @reservation = params[:reservation]
    mail(to: @employee.user.email, subject: "Booked place")
  end
end
