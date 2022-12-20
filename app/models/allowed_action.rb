# frozen_string_literal: true

class AllowedAction < ApplicationRecord
  has_and_belongs_to_many :permissions
end
