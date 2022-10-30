# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email, 100) { |n| "person#{n}@example.com" }
    password { "password123" }
  end
end
