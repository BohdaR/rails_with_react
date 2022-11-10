# frozen_string_literal: true

class FavoritesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    favorites = Favorite.where(employee: get_employee)
    render json: favorites.to_json(only: [:place_id, :id, :employee_id],
    include: [place: { only: [:number] }])
  end

  def create
    place = Place.find(params[:place_id])
    favorite = get_employee.favorites.new(place_id: place.id)
    if favorite.save
      render json: favorite
    else
      render json: { errors: { message: favorite.errors.full_messages } }, status: :bad_request
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    if favorite.destroy
      render json: favorite.destroy
    else
      render json: { errors: { message: favorite.errors.full_messages } }, status: :bad_request
    end
  end

  private
    def get_employee
      current_user.employee
    end
end
