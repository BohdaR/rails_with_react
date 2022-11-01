# frozen_string_literal: true

FactoryBot.define do
  factory :office do
    street { "вул. Костя Левицького" }
    house_number { "75a" }
    town { "Львів" }
    province { "Львівська обл." }
    country { "Україна" }
    company
  end
end
