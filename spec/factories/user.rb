# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email, 100) { |n| "person#{n}@example.com" }
    full_name { "Foo Bar" }
    password { "password123" }
    after(:build) { |user| user.class.skip_callback(:create, :after, :assign_employee, raise: false) }
  end
end
