# frozen_string_literal: true

FactoryBot.define do
  factory :employee do
    user
    company
    office
    sequence(:email, 100) { |n| "person#{n}@example.com" }
  end
end
