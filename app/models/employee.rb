class Employee < ApplicationRecord
  belongs_to :user
  belongs_to :company
  belongs_to :office
  has_many :reservations
end
