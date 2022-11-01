# frozen_string_literal: true

class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :update, :destroy]

  def index
    query_params = params.permit(:floor, :office_id)

    rooms = Room.where(query_params).not_empty_rooms
    render json: rooms
  end

  def show
    render json: @room
  end

  def create
    room = Room.new(room_params)
    if room.save
      render json: room
    else
      render json: room.errors, status: :bad_request
    end
  end

  def update
    if @room.update(room_params)
      render json: @room
    else
      render json: @room.errors, status: :bad_request
    end
  end

  def destroy
    render json: @room.destroy
  end

  private
    def set_room
      @room = Room.find(params[:id])
    end

    def room_params
      params.require(:room).permit(:office_id, :floor, :name, :company_id)
    end
end
