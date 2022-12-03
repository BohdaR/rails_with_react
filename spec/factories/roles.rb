# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    name { "MyString" }
    auth_group
  end
end
