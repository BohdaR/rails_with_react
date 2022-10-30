# frozen_string_literal: true

class FavoritesController < ApplicationController
  def index
    favorites = Favorite.where(employee: get_employee)
    render json: favorites
  end

  def create
    favorite = Favorite.new(favorite_params)
    favorite.employee = get_employee
    if favorite.save
      render json: favorite, status: :created
    else
      render json: { errors: { message: favorite.errors.full_messages } }, status: :unprocessable_entity
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
      params.permit(:place_id)
    end
end
