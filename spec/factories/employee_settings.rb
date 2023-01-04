# frozen_string_literal: true

FactoryBot.define do
  factory :employee_setting do
    slack_notifications { false }
    email_notifications { false }
    employee { nil }
  end
end
