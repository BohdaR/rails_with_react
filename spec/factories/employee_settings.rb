FactoryBot.define do
  factory :employee_setting do
    slack_notifications { false }
    email_notifications { false }
    employee { nil }
  end
end
