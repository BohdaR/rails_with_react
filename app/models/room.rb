# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, :floor, presence: true

  belongs_to :office
  belongs_to :company
  has_many :places, dependent: :destroy

  has_and_belongs_to_many :issues

  def self.not_empty_rooms(kwargs)
    free_places = Place.free_places(kwargs[:look_from], kwargs[:look_to]).to_sql
    Room.distinct.joins("INNER JOIN (#{free_places}) free_places on free_places.room_id = rooms.id").order(:id)
  end

  scope :floors, -> {
    Room.select(:floor).distinct
  }
end
