# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :assign_employee, only: [:index], unless: -> { current_user.employee }

  def index
    unless current_user.employee
      render file: "#{Rails.root}/public/403.html", status: 403, layout: false
    end
  end

  def user_reservation
  end

  def booking
    if current_user.employee
      @current_office = Office.find(current_user.employee.office_id)
    else
      render file: "#{Rails.root}/public/403.html", status: 403, layout: false
    end
  end

  def favorite_places
  end

  def companies_list
  end

  private
    def assign_employee
      current_user.assign_employee
    end
end
