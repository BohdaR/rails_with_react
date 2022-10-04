# frozen_string_literal: true

class Reservation < ApplicationRecord
  validates :start_at, comparison: { greater_than_or_equal_to: Time.now }, presence: true
  validates :end_at, comparison: { greater_than: :start_at }, presence: true

  belongs_to :employee
  belongs_to :place
end
