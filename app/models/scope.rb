# frozen_string_literal: true

class Scope < ApplicationRecord
  validates :priority, presence: true

  has_many :permissions
end
