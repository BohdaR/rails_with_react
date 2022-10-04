# frozen_string_literal: true

class Company < ApplicationRecord
  validates :name, :domain_name, uniqueness: true, presence: true

  has_many :offices
  has_many :rooms
  has_many :employees
end
