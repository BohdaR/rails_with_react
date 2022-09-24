class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    if current_user
      @reservations = Reservation.where(employee: get_employee)
      render json: @reservations
    else
      redirect_to :new_user_session
    end
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
    # current_user.employee
    Employee.take
  end

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end
end