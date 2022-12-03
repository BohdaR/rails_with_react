# frozen_string_literal: true

FactoryBot.define do
  factory :auth_group do
    name { "Super admin" }
    priority { 0 }
  end
end
