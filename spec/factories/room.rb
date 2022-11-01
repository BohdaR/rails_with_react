# frozen_string_literal: true

FactoryBot.define do
  factory :room do
    floor { 1 }
    name { "Meeting room" }
    company
    office
  end
end
