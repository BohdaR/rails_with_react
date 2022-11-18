# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :employee
  belongs_to :place

  validates_uniqueness_of :place_id, scope: :employee_id

  scope :favorites_info, -> {
    joins("INNER JOIN places on places.id = favorites.place_id")
      .joins("INNER JOIN rooms on rooms.id = places.room_id")
      .select("
        favorites.id,
        rooms.name as room_name,
        places.number as place_number")
      .order("id DESC")
  }
end
