# frozen_string_literal: true

class CompaniesController < ApplicationController
  protect_from_forgery with: :null_session
  authorize_resource
  before_action :set_company, only: [:show, :update, :destroy]

  def index
    @companies = Company.all
    render json: @companies
  end

  def show
    render json: @company
  end

  def create
    company = Company.create(company_params)
    if company.save
      render json: company
    else
      render json: company.errors, status: :bad_request
    end
  end

  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :bad_request
    end
  end

  def destroy
    render json: @company.destroy
  end

  private
    def set_company
      @company = Company.find(params[:id])
    end
    def company_params
      params.require(:company).permit(:name, :domain_name, :description)
    end
end
