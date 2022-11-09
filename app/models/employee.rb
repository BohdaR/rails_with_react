# frozen_string_literal: true

class Employee < ApplicationRecord
  belongs_to :user
  belongs_to :company
  belongs_to :office
  has_many :reservations, dependent: :delete_all
  has_many :favorites, dependent: :delete_all

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
