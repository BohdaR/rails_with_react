# frozen_string_literal: true

class Place < ApplicationRecord
  validates :number, presence: true

  belongs_to :room
  has_many :reservations, dependent: :destroy
  has_many :favorites, dependent: :destroy
end
