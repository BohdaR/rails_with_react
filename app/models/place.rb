# frozen_string_literal: true

class Place < ApplicationRecord
  validates :number, presence: true

  belongs_to :room
  has_many :reservations, dependent: :destroy
  has_many :favorites, dependent: :destroy

  has_and_belongs_to_many :issues

  def available_to_book?(look_from, look_to)
    Place.free_places(look_from, look_to).include? self
  end

  def self.free_places(look_from = Time.zone.now, look_to = Time.zone.now + 1.day)
    Place.left_joins(:issues, :reservations)
         .where("reservations.place_id IS NULL")
         .where("issues_places.place_id IS NULL")
         .or(Reservation.where("end_at < ?", look_from).where("? < ?", look_from, look_to))
         .distinct
         .order(:id)
  end

  def self.booked_places(look_from, look_to)
    Place.where.not(id: Place.free_places(look_from, look_to).ids)
      .select("places.*", "users.avatar_url", "users.full_name")
      .joins(:reservations).joins("INNER JOIN employees ON employees.id = reservations.employee_id")
      .joins("INNER JOIN users ON users.id = employees.user_id")
  end

end
