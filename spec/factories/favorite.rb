# frozen_string_literal: true

FactoryBot.define do
  factory :favorite do
    employee
    place
  end

  factory :invalid_favorite do
    employee { nil }
    place
  end
end
