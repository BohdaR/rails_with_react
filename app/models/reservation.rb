# frozen_string_literal: true

class Reservation < ApplicationRecord
  # include GoogleCalendarApi

  # CALENDAR_ID = "primary".freeze

  validates :start_at, comparison: { greater_than_or_equal_to: Time.zone.now }, presence: true
  validates :end_at, comparison: { greater_than: :start_at }, presence: true

  belongs_to :employee
  belongs_to :place

  # after_create :publish_event_to_gcal
  # # after_update :update_event_on_gcal
  # before_destroy :remove_event_from_gcal

  scope :reservations_info, -> {
    joins("INNER JOIN places on places.id = reservations.place_id")
      .joins("INNER JOIN rooms on rooms.id = places.room_id")
      .select("
        reservations.id,
        rooms.name as room_name,
        places.id as place_id,
        places.number as place_number,
        reservations.start_at,
        reservations.end_at")
      .order("id DESC")
  }

  scope :office_visitors_by_current_week, -> (office_id) {
    select("count(distinct employee_id) AS quantity, case extract(dow from week.day_of_week) when 0 then 'Sunday'
                               when 1 then 'Monday'
                               when 2 then 'Tuesday'
                               when 3 then 'Wednesday'
                               when 4 then 'Thursday'
                               when 5 then 'Friday'
                               when 6 then 'Saturday'
                               end AS week_day")
      .joins("INNER JOIN places on places.id = reservations.place_id")
      .joins("INNER JOIN rooms on places.room_id = rooms.id")
      .joins("INNER JOIN offices on offices.id = rooms.office_id")
      .joins("INNER JOIN (SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int as day_of_week
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 1
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 2
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 3
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 4
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 5
                     UNION
                     SELECT (now() at time zone '#{Time.zone.name}')::date - abs(extract(dow FROM now() at time zone '#{Time.zone.name}'))::int + 6) as week
                    on week.day_of_week::date BETWEEN start_at::date AND end_at::date")
      .where("offices.id = ? ", office_id)
      .group("day_of_week")
      .order("day_of_week")
  }

  def publish_event_to_gcal(user)
    self.create_google_event(self, user)
  end

#  def remove_event_from_gcal
#   self.delete_google_event(self)
#  end
end
