# frozen_string_literal: true

require "google/apis/calendar_v3"
require "google/api_client/client_secrets.rb"

module GoogleCalendar
  class EventScheduler
    attr_accessor :reservation, :user, :client, :place, :room

    CALENDAR_ID = "primary"

    def initialize(user, reservation)
      @user = user
      @reservation = reservation
      @client = build_client
    end

    def register_event
      calendar_event = Google::Apis::CalendarV3::Event.new(
        summary: "Place Reservation",
        location: "Ukraine, Lviv",
        description: "Hello! You booked a place number #{reservation.place.number} at #{reservation.place.room.name}",
        start: {
          date_time: reservation.start_at.to_datetime.rfc3339,
          time_zone: "Europe/Kiev"
        },
        end: {
          date_time: reservation.end_at.to_datetime.rfc3339,
          time_zone: "Europe/Kiev"
        },
        attendees: [
          Google::Apis::CalendarV3::EventAttendee.new(
            email: user.email
          )
        ],
        reminders: {
          use_default: false,
          overrides: [
            Google::Apis::CalendarV3::EventReminder.new(reminder_method: "popup", minutes: 10),
            Google::Apis::CalendarV3::EventReminder.new(reminder_method: "email", minutes: 20)
          ]
        },
        notification_settings: {
          notifications: [
                          { type: "event_creation", method: "email" },
                          { type: "event_change", method: "email" },
                          { type: "event_cancellation", method: "email" },
                          { type: "event_response", method: "email" }
                        ]
        }, 'primary': true
      )
      result = client.insert_event(CALENDAR_ID, calendar_event)
      reservation.update!(calendar_id: result.id, calendar_link: result.html_link)
    end

    def delete_event
      client.delete_event("primary", reservation.calendar_id)
      rescue StandardError => e
        puts "Error occured for deleting reservation"
        puts e
    end

    private
      def build_client
        return unless user.present? && user.access_token.present? && user.refresh_token.present?

        client = Google::Apis::CalendarV3::CalendarService.new
        secrets = Google::APIClient::ClientSecrets.new({
                                                         "web" => {
                                                           "access_token" => user.access_token,
                                                           "refresh_token" => user.refresh_token,
                                                           "client_id" => ENV["GOOGLE_OAUTH_CLIENT_ID"],
                                                           "client_secret" => ENV["GOOGLE_OAUTH_CLIENT_SECRET"],
                                                         }
                                                       })

        client.authorization = secrets.to_authorization
        regenerate_token_if_expired?(client)
        client
      end

      def regenerate_token_if_expired?(client)
        return unless user.token_expired?

        begin
          client.authorization.refresh!
          user.update_attributes(
            access_token: client.authorization.access_token,
            refresh_token: client.authorization.refresh_token,
            expires_at: client.authorization.expires_at.to_i
          )
        rescue StandardError => e
          puts "Error occured while refershing token #{e}"
        end
      end
  end
end
