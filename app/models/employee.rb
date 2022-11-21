# frozen_string_literal: true

class Employee < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :company
  belongs_to :office

  has_many :reservations, dependent: :delete_all
  has_many :favorites, dependent: :delete_all

  has_and_belongs_to_many :roles
end
