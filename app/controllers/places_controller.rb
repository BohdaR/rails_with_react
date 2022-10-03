class PlacesController < ApplicationController
  before_action :get_unreserved_places, only: :index
  before_action :set_place, only: [:show, :update, :destroy]

  def index
    render json: @unreserved_places
  end

  def show
    render json: @place
  end

  def create
    place = Place.new({ room_id: params[:room_id] }.merge(place_params))
    if place.save
      render json: place
    else
      render json: place.errors, status: :bad_request
    end
  end

  def update
    if @place.update(place_params)
      render json: @place
    else
      render json: @place.errors, status: :bad_request
    end
  end

  def destroy
    render json: @place.destroy
  end

  private

  def place_params
    params.require(:place).permit(:number)
  end

  def set_place
    @place = Place.where(room_id: params[:room_id]).find(params[:id])
  end

  def get_unreserved_places
    look_from = params[:look_from] ? params[:look_from] : Time.now
    look_to = params[:look_to] ? params[:look_to] : look_from

    @unreserved_places = Place.where
                              .not(id: Place.joins(:reservations)
                                            .where('start_at < ?', look_from).where('end_at > ?', look_from)
                                            .or(Reservation.where('start_at < ?', look_to).where('end_at > ?', look_to))
                                            .or(Reservation.where('start_at > ?', look_from).where('end_at < ?', look_to)))
                              .where(room_id: params[:room_id])
  end
end
