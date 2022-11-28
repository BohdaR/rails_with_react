# frozen_string_literal: true

class AllowedAction < ApplicationRecord
  has_many :permissions
end
