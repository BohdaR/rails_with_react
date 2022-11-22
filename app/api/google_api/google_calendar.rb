require "google/apis/calendar_v3"
require "google/api_client/client_secrets.rb"

module GoogleApi
  module GoogleCalendar
    class CalendarEvent
      CALENDAR_ID = 'primary'

      def create_google_event(reservation)
        client = get_google_calendar_client
        _event = event_details(reservation)
        client.insert_event(CALENDAR_ID, _event)
      end

      def get_google_calendar_client
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

      def event_details(reservation)
        event = Google::Apis::CalendarV3::Event.new(
          summary: "Dermatology Appointment",
          location: "OITC-2 Oakridge Business Park, Mandaue City, Cebu",
          description: "Paid Appointment for:",
					start: {
						date_time: reservation.start_at.to_datetime.to_s,
						time_zone: "Europe/Kiev"
					},
					end: {
						date_time: reservation.end_at.to_datetime.to_s,
						time_zone: "Europe/Kiev"
					},
          reminders: {
            use_default: false
          },
          sendNotifications: true,
          sendUpdates: 'all'
        )
      end
    end
  end
end