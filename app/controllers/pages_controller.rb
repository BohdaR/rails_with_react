# frozen_string_literal: true

class PagesController < ApplicationController
  def index
  end

  def booking
    if current_user.employee
      @current_office = Office.find(current_user.employee.office_id)
    else
      render file: "#{Rails.root}/public/403.html", status: 403, layout: false
    end
  end
end
