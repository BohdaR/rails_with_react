# frozen_string_literal: true

class Room < ApplicationRecord
  validates :name, :floor, presence: true

  belongs_to :office
  belongs_to :company
  has_many :places, dependent: :destroy
end
