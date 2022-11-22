require "google/apis/calendar_v3"
require "google/api_client/client_secrets.rb"

module GoogleCalendarApi

  include ActiveSupport::Concern

  def get_google_calendar_client(current_user)
    client = Google::Apis::CalendarV3::CalendarService.new
    return unless (current_user.present? && current_user.access_token.present? && current_user.refresh_token.present?)
    secrets = Google::APIClient::ClientSecrets.new({
      "web" => {
        "access_token" => current_user.access_token,
        "refresh_token" => current_user.refresh_token,
				"client_id" => ENV["GOOGLE_OAUTH_CLIENT_ID"],
				"client_secret" => ENV["GOOGLE_OAUTH_CLIENT_SECRET"]
      }
    })
    begin
      client.authorization = secrets.to_authorization
      client.authorization.grant_type = "refresh_token"

      if current_user.expired?
        client.authorization.refresh!
        current_user.update_attributes(
          access_token: client.authorization.access_token,
          refresh_token: client.authorization.refresh_token,
          expires_at: client.authorization.expires_at.to_i
        )
      end
    rescue => e
      flash[:error] = "Your token has been expired. Please login again with google."
    end
    client
  end

  def get_event(reservation)
    event = Google::Apis::CalendarV3::Event.new({
      summary: "Dermatology Appointment",
      location: "Lviv, Ukraine",
      description: "You booked a place #",

      start: {
        date_time: reservation.start_at.to_datetime.to_s,
        time_zone: "Europe/Kiev"
      },
      end: {
        date_time: reservation.end_at.to_datetime.to_s,
        time_zone: "Europe/Kiev"
      },
      reminders: {
        use_default: true
      },
      notification_settings: {
        notifications: [
                         { type: "event_creation", method: "email" },
                         { type: "event_change", method: "email" },
                         { type: "event_cancellation", method: "email" },
                         { type: "event_response", method: "email" },
                       ],
      }, "primary": true
    })
  end

	def create_google_event(reservation)
		client = get_google_calendar_client(employee)
    g_event = get_event(reservation)
    ge = client.insert_event(Event::CALENDAR_ID, g_event)
    reservation.update(calendar_id: ge.id)
  end

  # def delete_google_event(reservation)
  #   client = get_google_calendar_client(reservation.employee)
  #   client.delete_event(Event::CALENDAR_ID, reservation.calendar_id)
  # end

  # #correct!!

  # def get_google_event(calendar_id, employee)
  #   client = get_google_calendar_client(current_user.employee)
  #   g_event = client.get_event(Event::CALENDAR_ID, calendar_id)
  # end
end