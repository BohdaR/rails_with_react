# frozen_string_literal: true

class Office < ApplicationRecord
  validates :street, :house_number, :town, :province, :country, presence: true

  belongs_to :company
  has_many :rooms, dependent: :destroy
  has_many :employees, dependent: :destroy
end
