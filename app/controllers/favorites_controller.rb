class FavoritesController < ApplicationController

  # def index
  #   @favorites = get_employee.favorites
  # end

	# def create
	# 	@favorite = get_employee.favorites.new(favorite_params)
	# 	if @favorite.save
	# 		redirect to @favorite.room
	# 	else
	# 		render json: @favorite.errors.full_messages, status: :unprocessable_entity
	# 	end
	# end

	# def destroy
	# 	@favorite = get_employee.likes.find(params[:id])
	# 	room = @favorite.room
	# 	@favorite.destroy
	# 	render json: room
	# end

	# private 

	# def get_employee
	# 	current_user.employee 
	# end 

	# def favorite_params
	# 	params.require(:favorite).permit(:room_id)
	# end
end
