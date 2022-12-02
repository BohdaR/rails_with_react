# frozen_string_literal: true

class Role < ApplicationRecord
  validates :priority, presence: true

  has_and_belongs_to_many :employees
  has_and_belongs_to_many :permissions
end
