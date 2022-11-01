# frozen_string_literal: true

FactoryBot.define do
  factory :employee do
    user
    company
    office
  end
end
