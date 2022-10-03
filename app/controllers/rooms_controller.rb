class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :update, :destroy]

  def index
    query_params = params.permit(:floor, :office_id)

    rooms = Room.where(query_params)
    render json: rooms
  end

  def show
    render json: @room
  end

  def edit
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      render json: @room
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @room.update(room_params)
      redirect_to room_url(@room)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @room.destroy
    redirect_to rooms_url
  end

  private
  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:office_id, :floor, :name, :company_id)
  end
end
