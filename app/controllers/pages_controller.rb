class PagesController < ApplicationController

  def index
  end

  def booking
    @current_office = Office.find(current_user.employee.office_id)
  end

end
