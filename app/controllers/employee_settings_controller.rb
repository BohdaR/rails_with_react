# frozen_string_literal: true

class EmployeeSettingsController < ApplicationController
  authorize_resource
  before_action :set_setting, only: [:show, :update, :destroy]

  def index
  end

  def show
    render json: @setting
  end

  def create
    setting = EmployeeSetting.create(employee_settings_params)
    if setting.save
      render json: setting
    else
      render json: setting.errors, status: :bad_request
    end
  end

  def update
    if @setting.update(employee_settings_params)
      render json: @setting
    else
      render json: @setting.errors, status: :bad_request
    end
  end

  def destroy
    render json: @setting.destroy
  end

  private
  def set_setting
    @setting = EmployeeSetting.find(params[:id])
  end
  def employee_settings_params
    params.require(:employee_setting).permit(:slack_notifications, :email_notifications)
  end
end
