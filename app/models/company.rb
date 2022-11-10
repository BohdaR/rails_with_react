# frozen_string_literal: true

class Company < ApplicationRecord
  has_one_attached :image
  validates :name, :domain_name, uniqueness: true, presence: true
  validates :description, presence: true

  has_many :offices, dependent: :destroy
  has_many :rooms, dependent: :destroy
  has_many :employees, dependent: :destroy
end
