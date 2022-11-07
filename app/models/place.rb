# frozen_string_literal: true

class Place < ApplicationRecord
  validates :number, presence: true

  belongs_to :room
  has_many :reservations, dependent: :destroy
  has_many :favorites, dependent: :destroy

  def self.free_places(look_from = Time.zone.now, look_to = Time.zone.now + 1.day)
    Place.left_joins(:reservations)
         .where("place_id IS NULL")
         .or(Reservation.where("end_at < ?", look_from).where("? < ?", look_from, look_to))
         .order(:id)
  end
end
