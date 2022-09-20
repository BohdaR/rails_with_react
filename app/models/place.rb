class Place < ApplicationRecord
  validates :number, presence: true

  belongs_to :room
  has_many :reservations
end
