# frozen_string_literal: true

FactoryBot.define do
  factory :scope do
    name { "all" }
    priority { 0 }
    description { "MyString" }
  end
end
