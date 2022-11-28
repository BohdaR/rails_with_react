# frozen_string_literal: true

class Permission < ApplicationRecord
  has_and_belongs_to_many :roles
  belongs_to :allowed_action
  belongs_to :scope
  belongs_to :subject
end
