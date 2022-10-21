# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :employee
  belongs_to :place

  validates_uniqueness_of :place_id, scope: :employee_id
end
