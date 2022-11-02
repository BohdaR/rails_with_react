# frozen_string_literal: true

require "rails_helper"

RSpec.describe PagesController, type: :controller do
  let(:office) { create(:office, employee_id: employee) }
  let(:user) { create(:user) }
  let(:employee) { create(:employee, office_id: 9) }

  before(:each) do
    sign_in(user)
  end

  it "returns forbidden when user isn't employee" do
    get "booking"
    expect(response).to have_http_status(:forbidden)
  end
end
