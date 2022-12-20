# frozen_string_literal: true

class Role < ApplicationRecord
  has_and_belongs_to_many :employees
  has_and_belongs_to_many :permissions

  belongs_to :auth_group
end
