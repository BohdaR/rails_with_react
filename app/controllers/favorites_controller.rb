class FavoritesController < ApplicationController
	before_action :set_place, only: [:create, :destroy]

	def index
    favorites = Favorite.where(employee_id: @employee.id)
		render_json: favorites
  end

	def create
    favorite = get_employee.favorites.new(place_id: @place.id)
    if favorite.save
			render json: favorite
		else
			render json: favorite.errors.full_messages, status: 422
		end
		
	end

	def destroy
    favorite = get_employee.favorites.find_by(place_id: @place.id)
    render json: favorite.destroy if favorite.present?
	end

	private 

	def get_employee
		current_user.employee 
	end 

	def set_place
		@place = Place.find(params[:place_id])
	end

	# def favorite_params
	# 	params.require(:favorite).permit(:place_id)
	# end
end
