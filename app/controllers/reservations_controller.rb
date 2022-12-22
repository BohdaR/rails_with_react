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
    if Place.where(id: params[:reservation][:place_id]).empty?
      render json: { place: ["There is no such place!"] }, status: :bad_request
    else
      reservation = Reservation.new({ employee: get_employee }.merge(reservation_params))
      if reservation.valid?
        if available_place?(reservation_params)
          reservation.save
          GoogleCalendar::EventScheduler.new(current_user, reservation).register_event
          BookingMailer.with(employee: current_user.employee, reservation:).booked_place_email.deliver_later
          render json: reservation
        else
          render json: { time: ["This time is already taken!"] }, status: :unprocessable_entity
        end
      else
        render json: reservation.errors, status: :bad_request
      end
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

    def get_employee
      current_user.employee
    end

    def available_place?(params)
      Place.find(params[:place_id]).available_to_book?(params[:start_at], params[:end_at])
    end

    def set_reservation
      @reservation = Reservation.find(params[:id])
    end
end
