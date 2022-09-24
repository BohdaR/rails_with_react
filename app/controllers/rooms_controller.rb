class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :update, :destroy]
  def index
    @rooms = Room.all
  end

  def show

  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to room_url(@room)
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
