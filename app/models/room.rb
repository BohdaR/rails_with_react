# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, presence: true
  validates :floor, presence: true

  belongs_to :office
  has_many :places
end
