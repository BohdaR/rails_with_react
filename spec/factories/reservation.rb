# frozen_string_literal: true

FactoryBot.define do
  factory :reservation do
    start_at { Time.now + 4.hours }
    end_at { Time.now + 1.day }
    place
    employee
  end
end
