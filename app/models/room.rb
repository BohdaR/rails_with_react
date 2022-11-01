# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, :floor, presence: true

  belongs_to :office
  belongs_to :company
  has_many :places, dependent: :destroy

  def self.not_empty_rooms(look_from = Time.now, look_to = Time.now + 1.day)
    free_places = Place.free_places(look_from, look_to).to_sql
    Room.distinct.joins("INNER JOIN (#{free_places}) free_places on free_places.room_id = rooms.id").order(:id)
  end

  scope :floors, -> {
    Room.select(:floor).distinct
  }
end
