# frozen_string_literal: true

class ReservationsController < ApplicationController
  authorize_resource
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    reservations = Reservation.reservations_info.where(employee: get_employee)
    render json: reservations
  end

  def show
    render json: @reservation
  end

  def create
    reservation = Reservation.new({ employee: get_employee }.merge(reservation_params))
    if reservation.save
      GoogleCalendar::EventScheduler.new(current_user, reservation).register_event
      unless current_user.slack_id.blank?
        send_slack_notification(reservation)
      end
      BookingMailer.with(employee: current_user.employee, reservation:).booked_place_email.deliver_later
      render json: reservation
    else
      render json: reservation.errors, status: :bad_request
    end
  end

  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: @reservation.errors, status: :bad_request
    end
  end

  def destroy
    GoogleCalendar::EventScheduler.new(current_user, @reservation).delete_event
    render json: @reservation.destroy
  end

  private

  def reservation_params
    params.require(:reservation).permit(:place_id, :start_at, :end_at)
  end

  def send_slack_notification(reservation)
    client_id = current_user.slack_id
    slack = Slack::Web::Client.new
    notification_text = "You book place #{reservation.place.number} in #{reservation.place.room.name} from #{reservation.start_at.strftime("%B %d, %H:%M")} to from #{reservation.end_at.strftime("%B %d, %H:%M")}"
    slack.chat_postMessage(channel: client_id, text: notification_text, as_user: true)
  end

  def get_employee
    current_user.employee
  end

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end
end
