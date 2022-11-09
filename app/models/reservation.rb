# frozen_string_literal: true

class Reservation < ApplicationRecord
  validates :start_at, comparison: { greater_than_or_equal_to: Time.now }, presence: true
  validates :end_at, comparison: { greater_than: :start_at }, presence: true

  belongs_to :employee
  belongs_to :place

  scope :reservations_info, -> {
    joins("INNER JOIN places on places.id = reservations.place_id")
      .joins("INNER JOIN rooms on rooms.id = places.room_id")
      .select("
        reservations.id,
        rooms.name as room_name,
        places.number as place_number,
        reservations.start_at,
        reservations.end_at")
      .order("id DESC")
  }
end
