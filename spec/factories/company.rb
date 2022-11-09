# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    description { "Some description" }
    sequence(:name, 100) { |n|  "CyberCraft#{n}" }
    sequence(:domain_name, 100) { |n| "cybercraft#{n}inc.com" }
  end
end
