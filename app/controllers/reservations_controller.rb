# frozen_string_literal: true

class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    reservations =
      Reservation
        .joins("INNER JOIN places on places.id = reservations.place_id")
        .joins("INNER JOIN rooms on rooms.id = places.room_id")
        .select("
        reservations.id,
        rooms.name as room_name,
        places.number as place_number,
        reservations.start_at,
        reservations.end_at")
        .where(employee: get_employee)
    render json: reservations
  end

  def show
    render json: @reservation
  end

  def create
    reservation = Reservation.new({ employee: get_employee }.merge(reservation_params))
    if reservation.save
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
    render json: @reservation.destroy
  end

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
