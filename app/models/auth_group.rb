# frozen_string_literal: true

class AuthGroup < ApplicationRecord
  validates :priority, presence: true

  has_many :permissions
  has_many :roles
end
