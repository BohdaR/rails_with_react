# frozen_string_literal: true

class OfficesController < ApplicationController
  before_action :set_office, only: [:show, :update, :destroy]

  def index
    offices = Office.all
    render json: offices
  end

  def show
    render json: @office
  end

  def create
    office = Office.new(offices_params)
    if office.save
      render json: office
    else
      render json: office.errors, status: :bad_request
    end
  end

  def update
    if @office.update(offices_params)
      render json: @office
    else
      render json: @office.errors, status: :bad_request
    end
  end

  def destroy
    render json: @office.destroy
  end

  private
    def set_office
      @office = Office.find(params[:id])
    end

    def offices_params
      params.require(:office).permit(:company_id, :street, :house_number, :town, :province, :country)
    end
end
