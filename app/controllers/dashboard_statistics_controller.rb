class DashboardStatisticsController < ApplicationController

  def office_visiting
    data = Reservation.office_visitors_by_current_week(params[:office_id]).as_json(:except => [:id])
    render json: data
  end
end
