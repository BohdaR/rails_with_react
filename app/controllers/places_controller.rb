# frozen_string_literal: true

class PlacesController < ApplicationController
  authorize_resource
  before_action :set_place, only: [:show, :update, :destroy]

  def index
    if params[:booked]
      render json: booked_places.as_json
    else
      render json: free_places
    end
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
      params.require(:place).permit(:room_id, :number)
    end

    def free_places
      Place.free_places(
        params[:look_from],
        params[:look_to],
      ).where(room_id: params[:room_id])
    end

    def booked_places
      Place.booked_places(
        params[:look_from],
        params[:look_to],
      ).where(room_id: params[:room_id])
    end

    def set_place
      @place = Place.where(room_id: params[:room_id]).find(params[:id])
    end
end
