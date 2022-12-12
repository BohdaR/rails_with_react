# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, :floor, presence: true

  belongs_to :office
  belongs_to :company
  has_many :places, dependent: :destroy

  has_and_belongs_to_many :issues

  def self.not_empty_rooms(kwargs)
    free_places = Place.free_places(kwargs[:look_from], kwargs[:look_to]).to_sql
    Room
      .left_joins(:issues)
      .where("issues_rooms_rooms_join.room_id IS NULL")
      .joins("INNER JOIN (#{free_places}) AS free_places ON free_places.room_id = rooms.id")
      .distinct
  end

  def self.floors(kwargs)
    Room.not_empty_rooms(kwargs).select("floor")
  end
end
