# frozen_string_literal: true

class Place < ApplicationRecord
  validates :number, presence: true

  belongs_to :room
  has_many :reservations, dependent: :destroy
  has_many :favorites, dependent: :destroy

  def self.free_places(look_from = Time.now, look_to = Time.now + 1.day, room_id)
    Place.where
         .not(id: Place.joins(:reservations)
                       .where("start_at < ?", look_from).where("end_at > ?", look_from)
                       .or(Reservation.where("start_at < ?", look_to).where("end_at > ?", look_to))
                       .or(Reservation.where("start_at > ?", look_from).where("end_at < ?", look_to)))
         .where(room_id:)
  end
end
