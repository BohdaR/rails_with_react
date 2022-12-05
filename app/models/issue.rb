class Issue < ApplicationRecord
  belongs_to :company

  has_and_belongs_to_many :places
  has_and_belongs_to_many :rooms
end
