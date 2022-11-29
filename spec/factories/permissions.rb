# frozen_string_literal: true

FactoryBot.define do
  factory :permission do
    scope
    allowed_action
    subject
    name { "MyString" }
  end
end
