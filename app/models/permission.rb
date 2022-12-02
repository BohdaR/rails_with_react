# frozen_string_literal: true

class Permission < ApplicationRecord
  has_and_belongs_to_many :roles
  has_and_belongs_to_many :allowed_actions

  belongs_to :scope
  belongs_to :subject
end
