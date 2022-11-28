# frozen_string_literal: true

class Scope < ApplicationRecord
  has_many :permissions
end
