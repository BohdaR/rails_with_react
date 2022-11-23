# frozen_string_literal: true
require "google/apis/calendar_v3"

class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    @reservations = Reservation.reservations_info.where(employee: get_employee)
    render json: @reservations
  end

  def show
    render json: @reservation
  end

  def create
    @reservation = Reservation.new({ employee: get_employee }.merge(reservation_params))
    @reservation.publish_event_to_gcal(current_user)

    if @reservation.save
      BookingMailer.with(employee: current_user.employee, reservation:).booked_place_email.deliver_later
      render json: @reservation
    else
      render json: @reservation.errors, status: :bad_request
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
    render json: @reservation.destroy
  end

  # def sync_with_google
  #   ge = @reservation.get_google_event(@reservation.calendar_id, @reservation.employee)
  #   @reservation.update(start_at: ge.start.start_at, end_at: ge.end.end_at)
  #   render json: @reservation, notice: "Event has been synced with google successfully."
  # end

  private
    def reservation_params
      params.require(:reservation).permit(:place_id, :start_at, :end_at)
    end

    def get_employee
      current_user.employee
    end

    def set_reservation
      @reservation = Reservation.find(params[:id])
    end
end
