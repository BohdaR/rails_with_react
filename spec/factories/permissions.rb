# frozen_string_literal: true

FactoryBot.define do
  factory :permission do
    scope
    subject
    name { "MyString" }
  end
end
