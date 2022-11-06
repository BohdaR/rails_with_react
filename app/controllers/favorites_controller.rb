# frozen_string_literal: true

class FavoritesController < ApplicationController
  def index
    favorites = Favorite.where(employee: get_employee)
    render json: favorites.to_json(only: [:place_id, :id],
    include: [place: { only: [:number]}])
  end

  def create
    favorite = Favorite.new({ employee: get_employee }.merge(favorite_params))
    if favorite.save
      render json: favorite
    else
      render json: { errors: { message: favorite.errors.full_messages } }, status: :bad_request
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    render json: favorite.destroy if favorite.present?
  end

  private
    def get_employee
      current_user.employee
    end

    def favorite_params
      params.require(:favorite).permit(:place_id)
    end
end
