# frozen_string_literal: true

class OfficesController < ApplicationController
  before_action :set_office, only: [:show, :update, :destroy]

  def index
    offices = Office.all
    render json: offices
  end

  def show
  end

  def edit
  end

  def new
    @office = Room.new
  end

  def create
    @office = Room.new(room_params)
    if @office.save
      render json: @office
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @office.update(room_params)
      redirect_to @office
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @office.destroy
    redirect_to offices_url
  end

  private
    def set_office
      @office = Office.find(params[:id])
    end

    def room_params
      params.require(:office).permit(:company_id, :street, :house_number, :town, :province, :country)
    end
end
